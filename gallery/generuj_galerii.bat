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
    
    rem Pouzijeme cely nazev slozky, aby se nezkracoval text pred teckou.
    set "folder_name=%%D"
    set "is_active=false"
    
    rem Přesná kontrola, zda název složky obsahuje text "v realizaci"
    echo !folder_name! | findstr /I /C:"v realizaci" >nul
    if !errorlevel! equ 0 set "is_active=true"
    
    echo     {>> "%json_file%"
    echo       "nazev": "!folder_name!",>> "%json_file%"
    echo       "slozka": "!folder_name!",>> "%json_file%"
    echo       "v_realizaci": !is_active!,>> "%json_file%"
    echo       "fotky": [>> "%json_file%"
    
    set "first_file=1"
    
    rem Uvozovky obaluji celou cestu vcetne hvezdicky a zachovaji mezery i diakritiku.
    for %%F in ("!folder_name!\*.jpg" "!folder_name!\*.jpeg" "!folder_name!\*.png" "!folder_name!\*.webp") do (
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
