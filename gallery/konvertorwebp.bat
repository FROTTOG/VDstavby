@echo off
setlocal enabledelayedexpansion

:: --- NASTAVENÍ ---
:: Zde si uprav maximální šířku a výšku (v pixelech)
set "MAX_WIDTH=1920"
set "MAX_HEIGHT=1080"
:: Nastavení kvality pro webp (0 - nejhorší, 100 - nejlepší)
set "QUALITY=80"
:: -----------------

:: Kontrola, zda je nainstalován program ImageMagick
where magick >nul 2>nul
if %errorlevel% neq 0 (
    echo CHYBA: Program ImageMagick nebyl nalezen!
    echo Ujistete se, ze je nainstalovany a pridany do systemove promenne PATH.
    pause
    exit /b
)

echo ===================================================================
echo  START: Hromadna konverze v teto slozce I PODSLOZKACH
echo ===================================================================

:: Projde všechny jpg, jpeg a png soubory v aktuální složce i všech podsložkách
for /f "delims=" %%I in ('dir /b /s *.jpg *.jpeg *.png 2^>nul') do (
    echo Zpracovavam: "%%I"
    
    :: %%~dpnI zajistí, že se .webp vytvoří přesně v té samé podsložce, kde je původní obrázek
    magick "%%I" -resize %MAX_WIDTH%x%MAX_HEIGHT%^> -quality %QUALITY% "%%~dpnI.webp"
    
    :: Kontrola, zda se vytvoril novy .webp soubor (pokud ano, puvodni smazeme)
    if exist "%%~dpnI.webp" (
        echo [OK] Zkonvertovano. Mazu puvodni soubor...
        del "%%I"
    ) else (
        echo [CHYBA] Nepodarilo se zkonvertovat, puvodni soubor zachovan.
    )
    echo -------------------------------------------------------------------
)

echo ===================================================================
echo  MAZANI: Odstranovani zaloznich souboru (.jpg_backup, .jpeg_backup)...
echo ===================================================================

:: Parametr /s zajistí smazání ze všech podsložek
del /s /q "*.jpeg_backup" 2>nul
del /s /q "*.jpg_backup" 2>nul

echo Záložní soubory byly vymazány z celé struktury.

echo ===================================================================
echo  MAZANI: Odstranovani slozek 'thumbs' a 'cache'...
echo ===================================================================

:: Vyhledá všechny složky s názvem thumbs a cache v celé struktuře a smaže je
for /f "delims=" %%D in ('dir /b /s /ad thumbs cache 2^>nul') do (
    if exist "%%D" (
        echo Mazu slozku: "%%D"
        rmdir /s /q "%%D"
    )
)

echo ===================================================================
echo Hotovo! Vsechny podadresare byly prohledany, zkonvertovany a vycisteny.
pause