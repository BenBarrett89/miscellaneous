# music-model
An attempt at some object-oriented JavaScript, modeling some musical concepts as objects.

## Objects
### Pitch
Some specific MIDI value e.g. _C5_

### Interval
Represents the difference between two Pitches e.g. _Major Second_

## TODO
### PitchBase
A MIDI base value (C - B, 0 - 11) e.g. _C_

### ChordDefinition
A definition of a chord - it's name/extension and Intervals e.g. _Maj7_

### ChordInstance
An instance of a chord - a collection of PitchBases e.g. _CMaj7_

### ChordVoicing
A voicing of a chord - a collection of specific Pitches e.g. _CMaj7/G_

### ScaleDefinition
A definition of a scale - it's name and Intervals e.g. _Harmonic Minor_

### ScaleInstance
An instance of a scale - a collection of PitchBases e.g. _C Harmonic Minor_

### ScaleNotes
All MIDI notes of a ScaleInstance - a collection of Pitches e.g. _C Harmonic Minor_

### Key
A musical key e.g. _A Minor_

## Internal Dependencies
None

## External Dependencies
None
