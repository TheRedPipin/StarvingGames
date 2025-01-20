# Starving Games

Starving Games is a Hunger Games simulator that allows for custom player creation and simulation of events. The game includes a map, contestants with various backgrounds and stats, and random events that affect the outcome of the game.

## Base Features

- Custom player creation
- Random events (person-caused and environment-caused)
- Context box displaying overall data and events
- Color-coded keywords for different actions and statuses

## Future Additions

- Custom and Dynamic Map Deisgn
- User Controlled Sponsorship
- Maybe a cat or 2

## Map

The map is a 4 by 4 grid with 2D array indexing (e.g., a1, a2, a3, a4, b1, etc.).

## Class: `mother`

### Objects

- **Random Events**
  - Person-caused: murder, poison, injury
  - Environment-caused: drowning, starvation, infection
- **Contestants**
  - Name
  - Age
  - Gender
  - Dictionary of stats (e.g., strength: 5)
  - Inventory (also a dictionary)

## To-Do List
- Design landing page
- Start creating simulation logic
- A Stop and Start Button
- Contestant Pictures
- Red dots on map for contestants
- Map details

## Context Box

The context box contains overall data such as:
- Day
- Time
- People Alive

It also contains events such as:
- Contestant Movement
- Fights
- Deaths
- Environmental Events (Flooding, Animals, Quicksand, Storms)
- Profiting/Gaining of items, etc.
- Sponsorship

### Color-Coded Keywords

- **Exploration Actions** in Blue: Meets, Moves, Flees
- **Violent Actions** in Red: Bleeds, Breaks, Stabs, Shoots, Punch, Kick, Ignite, Punctures, Sprain
- **Map Reference** in Turquoise
- **Profiting Actions** in Yellow: Loots, Finds, Gathers
- **Alive** in Green
- **Dead** in Brown
- **Items**: Weapons in Gold, Consumables in Grey

## Backgrounds

- **Scholar**: Strength: 2; Intelligence: 9; Constitution: 4; Charisma: 6; Speed: 3
- **Miner**: Strength: 8; Intelligence: 2; Constitution: 7; Charisma: 3; Speed: 4
- **Thief**: Strength: 3; Intelligence: 5; Constitution: 4; Charisma: 2; Speed: 9
- **Average Joe**: Strength: 4; Intelligence: 4; Constitution: 4; Charisma: 4; Speed: 4
- **Warrior**: Strength: 9; Intelligence: 3; Constitution: 8; Charisma: 4; Speed: 2
- **Diplomat**: Strength: 3; Intelligence: 5; Constitution: 4; Charisma: 8; Speed: 6

## Stat Logic

`statValue = (Base stat + randomRange(0 to Base stat)) > 10 = 10`

## How to Run

1. Clone the repository.
2. Open `creationIndex.html` in your browser to create contestants.
3. After creating contestants, click the "Switch Page" button to go to the simulation.
4. Now watch ur beautifull Tributes murder each other!
