function isElectron()
{
    return typeof app == "object";
}

function msg(msg)
{
    if (isElectron())
    {
        app.alert( msg );
    }
    else
    {
        alert(msg);
    }
}

async function confirmation(msg)
{
    if (isElectron())
    {
        return await app.confirm( msg );
    }
    else
    {
        return confirm(msg);
    }
}

if (isElectron)
{
    window.addEventListener("keydown", (e) =>
    {
        // F12
        if (e.keyCode === 123)
        {
            app.toggleDevTools();
        }
    });
}