local nuiOpen = false

RegisterCommand("toggle", function()
    nuiOpen = not nuiOpen
    SendNUIMessage({type = "SHOW", payload = nuiOpen})
end)
