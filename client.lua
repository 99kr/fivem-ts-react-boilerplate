local nuiOpen = false

RegisterCommand("toggle", function()
    nuiOpen = not nuiOpen
    SendNUIMessage({type = "SHOW", payload = nuiOpen})
end)

Citizen.CreateThread(function()
    print("aa")
    Citizen.Wait(500)
    SendNUIMessage({
        type = "SEND_RESOURCENAME",
        payload = GetCurrentResourceName()
    })
end)