local nuiOpen = false

RegisterCommand("message", function(_, args)
    SendNUIMessage({type = "ADD_MESSAGE", payload = args[1]})
end)

RegisterCommand("toggle", function()
    nuiOpen = not nuiOpen
    SendNUIMessage({type = "TOGGLE", payload = nuiOpen})
end)

Citizen.CreateThread(function()
    Citizen.Wait(500)
    SendNUIMessage({
        type = "SEND_RESOURCENAME",
        payload = GetCurrentResourceName()
    })
end)

RegisterNUICallback("message", function(data)
    print(data.payload)
end)