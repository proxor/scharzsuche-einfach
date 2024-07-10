enum State {
    ModeChoice
    , Treasure
    , Pirat
}

let mode: State = State.ModeChoice
let selMode: State = State.Treasure

input.onButtonPressed(Button.A, function () {
    switch (mode) {
        case State.ModeChoice:
            selMode = (selMode == State.Treasure) ? State.Pirat : State.Treasure
            switch(selMode) {
                case State.Treasure:
                    basic.showLeds(`
                    # # # # #
                    # . # . #
                    # # # # #
                    # . # . #
                    # # # # #
                    `)
                break
                case State.Pirat:
                    basic.showLeds(`
                    . # # # .
                    # . # . #
                    # # # # #
                    # # # # #
                    . # # # .
                    `)
                    break
            }
            break
        case State.Treasure:
            break
        case State.Pirat:
            break
    }
})

input.onButtonPressed(Button.B, function () {
    switch (mode) {
        case State.ModeChoice:
            mode = selMode
            break
        case State.Treasure:
            break
        case State.Pirat:
            break
    }
})

radio.setGroup(1)
radio.setTransmitPower(7)

radio.onReceivedValue(function (name, value) {
    switch (mode) {
        case State.ModeChoice:
            break
        case State.Treasure:
            break
        case State.Pirat:
            led.plotBarGraph(
                128 - 42 - Math.abs(radio.receivedPacket(RadioPacketProperty.SignalStrength) + 42),
                128 - 42
            )
            music.play(music.tonePlayable(Note.C, music.beat(BeatFraction.Eighth)), music.PlaybackMode.InBackground)
            pause(1000)
            basic.clearScreen()
            break
    }
})

basic.forever(function () {
    switch (mode) {
        case State.ModeChoice:
            break
        case State.Treasure:
            radio.sendValue("Treasure", 1)
            //music.play(music.tonePlayable(Note.A, music.beat(BeatFraction.Eighth)), music.PlaybackMode.InBackground)
            pause(2000)
            break
        case State.Pirat:
            break
    }
})
