@echo off
setlocal enabledelayedexpansion
chcp 65001 > nul

set "json_file=galerie.json"

echo {> "%json_file%"
echo   "zakazky": [>> "%json_file%"

set "first_dir=1"

for /d %%D in (*) do (
    if "!first_dir!"=="0" (
        echo         ,>> "%json_file%"
    )
    set "first_dir=0"
    
    set "folder_name=%%~nD"
    set "is_active=false"
    
    rem Přesná kontrola, zda název složky obsahuje text "v realizaci"
    echo !folder_name! | findstr /I /C:"v realizaci" >nul
    if !errorlevel! equ 0 set "is_active=true"
    
    echo     {>> "%json_file%"
    echo       "nazev": "%%~nD",>> "%json_file%"
    echo       "slozka": "%%~nD",>> "%json_file%"
    echo       "v_realizaci": !is_active!,>> "%json_file%"
    echo       "fotky": [>> "%json_file%"
    
    set "first_file=1"
    
    rem OPRAVENO: Uvozovky nyní obalují celou cestu včetně hvězdičky
    for %%F in ("%%~D\*.jpg" "%%~D\*.jpeg" "%%~D\*.png" "%%~D\*.webp") do (
        if "!first_file!"=="0" (
            echo            ,>> "%json_file%"
        )
        set "first_file=0"
        echo            "%%~nxF">> "%json_file%"
    )
    
    echo       ]>> "%json_file%"
    echo     }>> "%json_file%"
)

echo   ]>> "%json_file%"
echo }>> "%json_file%"

echo Hotovo! Soubor galerie.json byl uspesne vygenerovan.
pause