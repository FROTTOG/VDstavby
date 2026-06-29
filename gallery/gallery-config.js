(function () {
    const STORAGE_KEY = "vdstavby.gallery.preferences.v2";
    const DEFAULT_LAYOUT = {
        adminColumns: 10,
        editorColumns: 4,
        publicProjectColumns: 3,
        publicDetailColumns: 5
    };
    const DEFAULT_SETTINGS = {
        sortMode: "custom",
        pinInProgress: true,
        customOrder: [],
        coverPhotos: {},
        photoOrders: {},
        inProgressOverrides: {},
        layout: { ...DEFAULT_LAYOUT },
        updatedAt: null
    };

    const SORT_MODES = [
        { value: "custom", label: "Vlastní pořadí" },
        { value: "name-asc", label: "Název A-Z" },
        { value: "name-desc", label: "Název Z-A" }
    ];

    function compareText(a, b) {
        return String(a || "").localeCompare(String(b || ""), "cs", { sensitivity: "base" });
    }

    function normalizeColumnCount(value, fallback) {
        const parsed = Number(value);
        if (!Number.isFinite(parsed)) return fallback;
        return Math.min(10, Math.max(1, Math.round(parsed)));
    }

    function cloneLayout(layout) {
        return {
            adminColumns: normalizeColumnCount(layout && layout.adminColumns, DEFAULT_LAYOUT.adminColumns),
            editorColumns: normalizeColumnCount(layout && layout.editorColumns, DEFAULT_LAYOUT.editorColumns),
            publicProjectColumns: normalizeColumnCount(layout && layout.publicProjectColumns, DEFAULT_LAYOUT.publicProjectColumns),
            publicDetailColumns: normalizeColumnCount(layout && layout.publicDetailColumns, DEFAULT_LAYOUT.publicDetailColumns)
        };
    }

    function cloneSettings(settings) {
        return {
            sortMode: SORT_MODES.some(mode => mode.value === settings.sortMode) ? settings.sortMode : DEFAULT_SETTINGS.sortMode,
            pinInProgress: settings.pinInProgress !== false,
            customOrder: Array.isArray(settings.customOrder) ? [...settings.customOrder] : [],
            coverPhotos: settings.coverPhotos && typeof settings.coverPhotos === "object" ? { ...settings.coverPhotos } : {},
            photoOrders: settings.photoOrders && typeof settings.photoOrders === "object" ? { ...settings.photoOrders } : {},
            inProgressOverrides: settings.inProgressOverrides && typeof settings.inProgressOverrides === "object" ? { ...settings.inProgressOverrides } : {},
            layout: cloneLayout(settings.layout),
            updatedAt: settings.updatedAt || null
        };
    }

    function getStoredSettings() {
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            if (!raw) return cloneSettings(DEFAULT_SETTINGS);
            const parsed = JSON.parse(raw);
            return cloneSettings({ ...DEFAULT_SETTINGS, ...parsed });
        } catch (error) {
            console.warn("Nepodarilo se nacist nastaveni galerie.", error);
            return cloneSettings(DEFAULT_SETTINGS);
        }
    }

    function saveSettings(settings) {
        const merged = cloneSettings({ ...DEFAULT_SETTINGS, ...settings, updatedAt: new Date().toISOString() });
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        } catch (error) {
            console.warn("Nepodarilo se ulozit nastaveni galerie.", error);
        }
        return merged;
    }

    function resetSettings() {
        try {
            window.localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.warn("Nepodarilo se resetovat nastaveni galerie.", error);
        }
        return cloneSettings(DEFAULT_SETTINGS);
    }

    function getProjectId(project) {
        return String(project && (project.slozka || project.nazev) || "").trim();
    }

    function getOrderedPhotos(project, settings) {
        const sourcePhotos = Array.isArray(project.fotky) ? [...project.fotky] : [];
        const projectId = getProjectId(project);
        const storedOrder = Array.isArray(settings.photoOrders[projectId]) ? settings.photoOrders[projectId] : [];
        const sourceSet = new Set(sourcePhotos);
        const orderedPhotos = storedOrder.filter(photo => sourceSet.has(photo));
        const missingPhotos = sourcePhotos.filter(photo => !orderedPhotos.includes(photo));
        return [...orderedPhotos, ...missingPhotos];
    }

    function getInProgressState(project, settings) {
        const projectId = getProjectId(project);
        if (Object.prototype.hasOwnProperty.call(settings.inProgressOverrides, projectId)) {
            return settings.inProgressOverrides[projectId] === true;
        }
        return project.v_realizaci === true;
    }

    function getCoverPhoto(project, settings, orderedPhotos) {
        const projectId = getProjectId(project);
        const configuredCover = settings.coverPhotos[projectId];
        if (configuredCover && orderedPhotos.includes(configuredCover)) {
            return configuredCover;
        }
        return orderedPhotos[0] || null;
    }

    function enrichProject(project, settings, fallbackIndex) {
        const id = getProjectId(project);
        const baseName = String(project.nazev || id).replace(/\s*-\s*v\s*realizaci/i, "").trim();
        const orderedPhotos = getOrderedPhotos(project, settings);
        const inProgress = getInProgressState(project, settings);

        return {
            ...project,
            _id: id,
            _displayName: baseName,
            _inProgress: inProgress,
            _photos: orderedPhotos,
            _coverPhoto: getCoverPhoto(project, settings, orderedPhotos),
            _photoCount: orderedPhotos.length,
            _fallbackIndex: fallbackIndex
        };
    }

    function createOrderMap(customOrder) {
        return new Map(customOrder.map((id, index) => [id, index]));
    }

    function getComparator(settings) {
        const orderMap = createOrderMap(settings.customOrder);

        return function compareProjects(a, b) {
            if (settings.pinInProgress && a._inProgress !== b._inProgress) {
                return a._inProgress ? -1 : 1;
            }

            if (settings.sortMode === "name-asc") {
                return compareText(a._displayName, b._displayName);
            }

            if (settings.sortMode === "name-desc") {
                return compareText(b._displayName, a._displayName);
            }

            const aOrder = orderMap.has(a._id) ? orderMap.get(a._id) : Number.MAX_SAFE_INTEGER;
            const bOrder = orderMap.has(b._id) ? orderMap.get(b._id) : Number.MAX_SAFE_INTEGER;
            if (aOrder !== bOrder) return aOrder - bOrder;

            const nameFallback = compareText(a._displayName, b._displayName);
            if (nameFallback !== 0) return nameFallback;

            return a._fallbackIndex - b._fallbackIndex;
        };
    }

    function applyGalleryPreferences(projects, settings) {
        const mergedSettings = cloneSettings({ ...DEFAULT_SETTINGS, ...settings });
        return [...projects]
            .map((project, index) => enrichProject(project, mergedSettings, index))
            .sort(getComparator(mergedSettings));
    }

    function exportSettings(settings) {
        return JSON.stringify(cloneSettings(settings), null, 2);
    }

    function importSettings(rawSettings) {
        const parsed = JSON.parse(rawSettings);
        return saveSettings(parsed);
    }

    function createCustomOrder(projects) {
        return projects.map(project => getProjectId(project));
    }

    window.VDGallery = {
        STORAGE_KEY,
        DEFAULT_SETTINGS: cloneSettings(DEFAULT_SETTINGS),
        SORT_MODES: [...SORT_MODES],
        getStoredSettings,
        saveSettings,
        resetSettings,
        exportSettings,
        importSettings,
        getProjectId,
        getOrderedPhotos,
        getCoverPhoto,
        getInProgressState,
        applyGalleryPreferences,
        createCustomOrder,
        cloneLayout
    };
})();
