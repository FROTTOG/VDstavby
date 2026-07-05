(function () {
    const STORAGE_KEY = "vdstavby.gallery.preferences.v2";
    const PROJECT_DEFAULTS_MARKER_START = "/* VDSTAVBY_PROJECT_DEFAULTS_START */";
    const PROJECT_DEFAULTS_MARKER_END = "/* VDSTAVBY_PROJECT_DEFAULTS_END */";

/* VDSTAVBY_PROJECT_DEFAULTS_START */
const PROJECT_DEFAULTS = {
    "sortMode": "custom",
    "pinInProgress": true,
    "customOrder": [
        "Převzetí stavebních prací na rodinném domě - Hosty",
        "Výstavba rodinného domu - Zlukov",
        "Snížení energetické náročnosti - Veselí nad Lužnicí",
        "2. Etapa střechy - Pořežany",
        "Zesílení vazných trámu dle projektu - Veselí nad Lužnicí",
        "Drobné zednické práce - Týn nad Vltavou",
        "1. Etapa střechy - Pořežany",
        "Stavební práce pro DVstav s.r.o. - Vesce",
        "Fasáda, kamen. obklad - Veselí nad Lužnicí",
        "Balkóny - Borkovice",
        "Fasáda zateplení zadní stěny - Veselí nad Lužnicí",
        "Zednické práce - Dolní Bukovsko",
        "Zednické práce - Zvěrotice",
        "Renovace fasády - Dolní Bukovsko",
        "Předělání koupelny - Dolní Bukovsko",
        "Oprava a renovace fasády rodinného domu, sokl marmolit po zámkové dlažbě - Dolní Bukovsko",
        "Výstavba skladu - Dolní Bukovsko",
        "2. Etapa - Kompletní rekonstrukce domu s novou výstavbou podkroví - Mažice",
        "2. Etapa výstavba rodinného domu - Veselí nad Lužnicí",
        "1. Etapa - Základová deska - Veselí nad Lužnicí",
        "Rekonstrukce koupelny a ostatní práce - Týn nad Vltavou",
        "Kompletní rekonstrukce bytu 3+1 - České Budějovice",
        "Fasáda pásky klinker - Širočiny",
        "Fasáda rodinného domu - Veselí nad Lužnicí",
        "Kompletní dodělání rodinného domu - Mažice",
        "Kompletní dodělání rodinného domu, zdobená fasáda podle foto a památkářů - Mažice",
        "Kompletní rekonstrukce bytu 3+1 na 2 bytové jednotky - České Budějovice",
        "Kompletní rekonstrukce bytu - Bechyně",
        "Výstavba garáže s bazénem - Týn nad Vltavou",
        "Kompletní rekonstrukce bytu 3+1  Týn nad Vltavou",
        "Výstavba pergoly a obložení plotu - Mažice",
        "Kompletní rekonstrukce koupelny - Ševětín",
        "Novostavba lékařského domu - Dolní Bukovsko",
        "Rekonstrukce a ostatní práce - Mažice",
        "Rekonstrukce domu - Veselí nad Lužnicí",
        "Rekonstrukce koupelny - Veselí nad Lužnicí",
        "Rekonstrukce koupelny a ostatní práce - Sviny",
        "Betony - Zálší",
        "Chalupa - Veselí nad Lužnicí",
        "Dlažby - DVstav",
        "Dodělání rekonstrukce domu - Mažice",
        "Drobné zednické práce - Mažice",
        "Fasáda - Vesce",
        "Fasáda - České Budějovice",
        "Fasáda pro DVstav - Tábor",
        "Garsonka - České Budějovice",
        "Izolace podlah pod podlahové topení - Bechyně",
        "Kompletní rekonstrukce bytu - Jihlava",
        "Kompletní rekonstrukce domu - Mažice",
        "Kompletní rekonstrukce domu s novou výstavbou podkroví - Mažice",
        "Kompletní rekonstrukce fasády - České Budějovice",
        "Kompletní rekonstrukce garsonky - České Budějovice",
        "Kompletní rekonstrukce kuchyň, chodba, koupelna - Pořežany",
        "Lepidlo, perlinka, štuk - Dodělání fasády - Písek",
        "Marmolit mondi - České Budějovice",
        "Natažení silikonové omítky - Pořežany",
        "Natažení silikonové omítky - Tábor",
        "Obklady a dlažby - Chýnov",
        "Opravy a různé zednické práce na rodinném domě - Bechyně",
        "Pergola síť, lepidlo a silikonová fasáda - Strakonice",
        "Podlaha + Obložky - České Budějovice",
        "Příprava koupelny pro obklady - Soběslav",
        "Rekonstrukce bytového jádra a ostatní práce - Týn nad Vltavou",
        "Rekonstrukce bytového jádra a ostatní práce - Veselí nad Lužnicí",
        "Rekonstrukce bytového jádra a ostatní práce - České Budějovice",
        "Rekonstrukce bytu - České Budějovice",
        "Rekonstrukce domu - Mažice",
        "Rekonstrukce koupelny - Dolní Bukovsko",
        "Rekonstrukce koupelny - Písek",
        "Snížení energetické náročnosti - Radošovice",
        "Výstavba opěrné zdi - Vesce",
        "Výstavba prostoru pro zaměstnance - Mažice",
        "Výstavba rodinného domu - Mažice",
        "Výstavba ustájení - Mažice",
        "Zateplení - Mažice",
        "Zateplení půdy - Mažice",
        "Zateplení půdy a ostatní práce - Bechyně",
        "Zednické práce - Borkovice",
        "Zednické práce - Mažice",
        "Zednické práce, obklady a dlažby - Veselí nad Lužnicí",
        "Zednické práce, štuky - Soběslav",
        "Komp. rekonstrukce domu - Mažice"
    ],
    "coverPhotos": {},
    "photoOrders": {},
    "inProgressOverrides": {},
    "layout": {
        "adminColumns": 10,
        "editorColumns": 4,
        "publicProjectColumns": 3,
        "publicDetailColumns": 5
    },
    "updatedAt": "2026-07-03T16:51:36.256Z"
};
/* VDSTAVBY_PROJECT_DEFAULTS_END */

    const DEFAULT_LAYOUT = {
        adminColumns: normalizeColumnCount(PROJECT_DEFAULTS.layout && PROJECT_DEFAULTS.layout.adminColumns, 5),
        editorColumns: normalizeColumnCount(PROJECT_DEFAULTS.layout && PROJECT_DEFAULTS.layout.editorColumns, 4),
        publicProjectColumns: normalizeColumnCount(PROJECT_DEFAULTS.layout && PROJECT_DEFAULTS.layout.publicProjectColumns, 3),
        publicDetailColumns: normalizeColumnCount(PROJECT_DEFAULTS.layout && PROJECT_DEFAULTS.layout.publicDetailColumns, 5)
    };

    const DEFAULT_SETTINGS = {
        sortMode: PROJECT_DEFAULTS.sortMode || "custom",
        pinInProgress: PROJECT_DEFAULTS.pinInProgress !== false,
        customOrder: Array.isArray(PROJECT_DEFAULTS.customOrder) ? [...PROJECT_DEFAULTS.customOrder] : [],
        coverPhotos: PROJECT_DEFAULTS.coverPhotos && typeof PROJECT_DEFAULTS.coverPhotos === "object" ? { ...PROJECT_DEFAULTS.coverPhotos } : {},
        photoOrders: PROJECT_DEFAULTS.photoOrders && typeof PROJECT_DEFAULTS.photoOrders === "object" ? { ...PROJECT_DEFAULTS.photoOrders } : {},
        inProgressOverrides: PROJECT_DEFAULTS.inProgressOverrides && typeof PROJECT_DEFAULTS.inProgressOverrides === "object" ? { ...PROJECT_DEFAULTS.inProgressOverrides } : {},
        layout: { ...DEFAULT_LAYOUT },
        updatedAt: PROJECT_DEFAULTS.updatedAt || null
    };

    const SORT_MODES = [
        { value: "custom", label: "Vlastní pořadí" },
        { value: "name-asc", label: "Název A-Z" },
        { value: "name-desc", label: "Název Z-A" }
    ];

    function compareText(a, b) {
        return String(a || "").localeCompare(String(b || ""), "cs", { sensitivity: "base" });
    }

    function escapeRegExp(text) {
        return String(text).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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
        const source = settings && typeof settings === "object" ? settings : {};
        return {
            sortMode: SORT_MODES.some(mode => mode.value === source.sortMode) ? source.sortMode : DEFAULT_SETTINGS.sortMode,
            pinInProgress: source.pinInProgress !== false,
            customOrder: Array.isArray(source.customOrder) ? [...source.customOrder].map(String).map(item => item.trim()).filter(Boolean) : [],
            coverPhotos: source.coverPhotos && typeof source.coverPhotos === "object" ? { ...source.coverPhotos } : {},
            photoOrders: source.photoOrders && typeof source.photoOrders === "object" ? { ...source.photoOrders } : {},
            inProgressOverrides: source.inProgressOverrides && typeof source.inProgressOverrides === "object" ? { ...source.inProgressOverrides } : {},
            layout: cloneLayout(source.layout),
            updatedAt: source.updatedAt || null
        };
    }

    function sanitizePhotoList(photos) {
        if (!Array.isArray(photos)) return [];
        const unique = new Set();
        return photos
            .map(photo => String(photo || "").trim())
            .filter(Boolean)
            .filter(photo => {
                if (unique.has(photo)) return false;
                unique.add(photo);
                return true;
            });
    }

    function sanitizeProject(project) {
        const source = project && typeof project === "object" ? project : {};
        const nazev = String(source.nazev || source.slozka || "").trim();
        const slozka = String(source.slozka || source.nazev || "").trim();
        return {
            ...source,
            nazev,
            slozka,
            v_realizaci: source.v_realizaci === true,
            fotky: sanitizePhotoList(source.fotky)
        };
    }

    function stripInternalKeys(project) {
        const output = {};
        Object.entries(project || {}).forEach(([key, value]) => {
            if (!key.startsWith("_")) {
                output[key] = value;
            }
        });
        return output;
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
        const sourcePhotos = sanitizePhotoList(project && project.fotky);
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
        return project && project.v_realizaci === true;
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
        const sanitized = sanitizeProject(project);
        const id = getProjectId(sanitized);
        const baseName = String(sanitized.nazev || id).replace(/\s*-\s*v\s*realizaci/i, "").trim();
        const orderedPhotos = getOrderedPhotos(sanitized, settings);
        const inProgress = getInProgressState(sanitized, settings);

        return {
            ...sanitized,
            _id: id,
            _displayName: baseName,
            _inProgress: inProgress,
            _photos: orderedPhotos,
            _coverPhoto: getCoverPhoto(sanitized, settings, orderedPhotos),
            _photoCount: orderedPhotos.length,
            _fallbackIndex: fallbackIndex
        };
    }

    function createOrderMap(customOrder) {
        return new Map((Array.isArray(customOrder) ? customOrder : []).map((id, index) => [id, index]));
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

    function createCustomOrder(projects) {
        return projects.map(project => getProjectId(project)).filter(Boolean);
    }

    function validateProjectsData(projects) {
        const errors = [];
        if (!Array.isArray(projects)) {
            return {
                valid: false,
                errors: ["Data galerie nejsou pole projektů."],
                sanitizedProjects: []
            };
        }

        const sanitizedProjects = projects.map(sanitizeProject);
        const seenIds = new Set();

        sanitizedProjects.forEach((project, index) => {
            const label = project.nazev || project.slozka || `Projekt #${index + 1}`;
            if (!project.nazev) {
                errors.push(`Projekt #${index + 1} nemá vyplněný název.`);
            }
            if (!project.slozka) {
                errors.push(`Projekt "${label}" nemá vyplněnou složku.`);
            }
            if (project.slozka) {
                if (seenIds.has(project.slozka)) {
                    errors.push(`Složka "${project.slozka}" se v datech vyskytuje vícekrát.`);
                }
                seenIds.add(project.slozka);
            }
            if (!Array.isArray(project.fotky) || !project.fotky.length) {
                errors.push(`Projekt "${label}" neobsahuje žádné fotky.`);
            }
            if (Array.isArray(project.fotky)) {
                const uniqueCount = new Set(project.fotky).size;
                if (uniqueCount !== project.fotky.length) {
                    errors.push(`Projekt "${label}" obsahuje duplicitní názvy fotek.`);
                }
            }
        });

        return {
            valid: errors.length === 0,
            errors,
            sanitizedProjects
        };
    }

    function validateSettings(settings, projects) {
        const errors = [];
        const normalized = cloneSettings(settings);
        const projectIds = new Set((Array.isArray(projects) ? projects : []).map(getProjectId).filter(Boolean));

        normalized.customOrder.forEach(id => {
            if (!projectIds.has(id)) {
                errors.push(`Pořadí obsahuje neznámý projekt "${id}".`);
            }
        });

        Object.keys(normalized.coverPhotos).forEach(projectId => {
            if (!projectIds.has(projectId)) {
                errors.push(`Úvodní fotka odkazuje na neznámý projekt "${projectId}".`);
            }
        });

        Object.keys(normalized.photoOrders).forEach(projectId => {
            if (!projectIds.has(projectId)) {
                errors.push(`Pořadí fotek odkazuje na neznámý projekt "${projectId}".`);
            }
        });

        Object.keys(normalized.inProgressOverrides).forEach(projectId => {
            if (!projectIds.has(projectId)) {
                errors.push(`Přepis stavu odkazuje na neznámý projekt "${projectId}".`);
            }
        });

        return {
            valid: errors.length === 0,
            errors,
            normalized
        };
    }

    function buildProjectsForSave(projects, settings) {
        const mergedSettings = cloneSettings({ ...DEFAULT_SETTINGS, ...settings });
        return applyGalleryPreferences(projects, mergedSettings).map(project => {
            const cleanProject = stripInternalKeys(project);
            const orderedPhotos = getOrderedPhotos(project, mergedSettings);
            const coverPhoto = getCoverPhoto(project, mergedSettings, orderedPhotos);
            const photosForSave = orderedPhotos.filter(photo => photo !== coverPhoto);

            if (coverPhoto) {
                photosForSave.unshift(coverPhoto);
            }

            return sanitizeProject({
                ...cleanProject,
                nazev: cleanProject.nazev || project._displayName || project.nazev,
                slozka: cleanProject.slozka || project._id || project.slozka,
                v_realizaci: getInProgressState(project, mergedSettings),
                fotky: photosForSave
            });
        });
    }

    function createProjectDefaultsForSave(projects, settings) {
        const mergedSettings = cloneSettings({ ...DEFAULT_SETTINGS, ...settings });
        const projectsForSave = buildProjectsForSave(projects, mergedSettings);

        return cloneSettings({
            sortMode: "custom",
            pinInProgress: mergedSettings.pinInProgress,
            customOrder: projectsForSave.map(project => getProjectId(project)),
            coverPhotos: {},
            photoOrders: {},
            inProgressOverrides: {},
            layout: cloneLayout(mergedSettings.layout),
            updatedAt: new Date().toISOString()
        });
    }

    function serializeProjectsJson(projects) {
        return `${JSON.stringify({ zakazky: projects.map(sanitizeProject) }, null, 2)}\n`;
    }

    function serializeProjectDefaultsBlock(projectDefaults) {
        return `${PROJECT_DEFAULTS_MARKER_START}\nconst PROJECT_DEFAULTS = ${JSON.stringify(cloneSettings(projectDefaults), null, 4)};\n${PROJECT_DEFAULTS_MARKER_END}`;
    }

    function replaceProjectDefaultsInSource(sourceText, projectDefaults) {
        // Ukotveno na začátek řádku (^[ \t]*), aby regex nenašel marker text omylem
        // uvnitř řetězců PROJECT_DEFAULTS_MARKER_START/END, ale jen u skutečného komentáře.
        const pattern = new RegExp(`^[ \\t]*${escapeRegExp(PROJECT_DEFAULTS_MARKER_START)}[\\s\\S]*?^[ \\t]*${escapeRegExp(PROJECT_DEFAULTS_MARKER_END)}`, "m");
        if (!pattern.test(sourceText)) {
            throw new Error("Ve gallery-config.js chybí blok projektových defaultů pro automatickou aktualizaci.");
        }
        return sourceText.replace(pattern, serializeProjectDefaultsBlock(projectDefaults));
    }

    function exportSettings(settings) {
        return JSON.stringify(cloneSettings(settings), null, 2);
    }

    function importSettings(rawSettings) {
        const parsed = JSON.parse(rawSettings);
        return saveSettings(parsed);
    }

    window.VDGallery = {
        STORAGE_KEY,
        PROJECT_DEFAULTS_MARKER_START,
        PROJECT_DEFAULTS_MARKER_END,
        PROJECT_DEFAULTS: cloneSettings(PROJECT_DEFAULTS),
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
        cloneLayout,
        cloneSettings,
        sanitizeProject,
        validateProjectsData,
        validateSettings,
        buildProjectsForSave,
        createProjectDefaultsForSave,
        serializeProjectsJson,
        replaceProjectDefaultsInSource
    };
})();