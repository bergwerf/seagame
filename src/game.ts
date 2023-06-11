// Game Logic
// ==========

import * as m from './util/math'
import * as layer from './layer/all'
import { Story, Layer, Trigger, Event_Map } from './story'

function garden_item_layer(name: string) {
  return new layer.Composite([
    new layer.Image(`assets/garden/items/${name}.png`),
    new layer.Click_Mask(`assets/garden/items/${name}_mask.png`, 'drag', Trigger.Down),
  ])
}

const layers = {
  // Navigation
  nav_rewind: new layer.Composite([
    new layer.Image('assets/nav/rewind.png'),
    new layer.Click_Mask('assets/nav/rewind_mask.png', 'rewind')
  ]),
  nav_next: new layer.Composite([
    new layer.Image('assets/nav/next.png'),
    new layer.Click_Mask('assets/nav/next_mask.png', 'next')
  ]),

  // Introduction
  intro_hourglass: new layer.Video('assets/intro/hourglass.mp4', { loop: true }),
  intro_dunes: new layer.Image('assets/intro/dunes.jpg'),
  intro_crab: new layer.Video('assets/intro/crab.mp4'),
  intro_sea: new layer.Video('assets/intro/sea.mp4'),
  intro_hand: new layer.Video('assets/intro/hand.mp4'),
  intro_shell: new layer.Composite([
    new layer.Image('assets/intro/shell.jpg'),
    new layer.Click_Mask('assets/intro/shell_mask.png', 'pickup')
  ]),
  intro_shell_pickup: new layer.Video('assets/intro/shell_pickup.mp4'),
  intro_welcome: new layer.Video('assets/intro/welcome.mp4', { loop: true }),
  intro_load: new layer.Video('assets/intro/jellyload.mp4'),

  // Character selection
  character_background: new layer.Video('assets/character/background.mp4', { loop: true }),
  character_characters: new layer.GIF('assets/character/characters.gif'),
  character_selection: new layer.Switch([
    new layer.Image('assets/character/orange_selected.png'),
    new layer.Image('assets/character/yellow_selected.png'),
    new layer.Image('assets/character/green_selected.png')
  ]),
  character_mask: new layer.Composite([
    new layer.Click_Mask('assets/character/orange_mask.png', 'orange'),
    new layer.Click_Mask('assets/character/yellow_mask.png', 'yellow'),
    new layer.Click_Mask('assets/character/green_mask.png', 'green')
  ]),
  character_start_mask: new layer.Click_Mask('assets/character/start_mask.png', 'start'),

  // Side-scroll landscape
  landscape_bg: new layer.Switch([
    new layer.Video('assets/landscape/bg_sad_sad.mp4', { loop: true }),
    new layer.Video('assets/landscape/bg_happy_sad.mp4', { loop: true }),
    new layer.Video('assets/landscape/bg_sad_happy.mp4', { loop: true })
  ]),
  landscape_nav: new layer.Composite([
    new layer.Image('assets/landscape/button_left.png'),
    new layer.Image('assets/landscape/button_right.png'),
    new layer.Click_Mask('assets/landscape/button_left_mask.png', 'left'),
    new layer.Click_Mask('assets/landscape/button_right_mask.png', 'right')
  ]),
  landscape_lmask: new layer.Click_Mask('assets/landscape/farmer_left_mask.png', 'farmer_left'),
  landscape_rmask: new layer.Click_Mask('assets/landscape/farmer_right_mask.png', 'farmer_right'),
  landscape_get_star: new layer.Video('assets/landscape/get_star.mp4', { loop: true }),

  // Garden minigame
  garden_intro: new layer.Video('assets/garden/intro.mp4', { muted: false, loop: true }),
  garden_start: new layer.Click_Mask('assets/garden/start_mask.png', 'start'),
  garden_background: new layer.Image('assets/garden/background.png'),
  garden_trashcan: new layer.GIF('assets/garden/trashcan.gif'),
  garden_trashcan_mask: new layer.Click_Mask('assets/garden/trashcan_mask.png', 'drop', Trigger.Up),
  garden_item1: garden_item_layer('bag'),
  garden_item2: garden_item_layer('can'),
  garden_item3: garden_item_layer('carton'),
  garden_item4: garden_item_layer('cup'),
  garden_item5: garden_item_layer('fish'),
  garden_item6: garden_item_layer('lamp'),
  garden_item7: garden_item_layer('paper'),
  garden_item8: garden_item_layer('spoon'),
  garden_completed: new layer.Video('assets/garden/completed.mp4'),

  // Windmill minigame
  windmill_intro: new layer.Video('assets/windmill/intro.mp4', { muted: false, loop: true }),
  windmill_intro_mask: new layer.Click_Mask('assets/windmill/intro_mask.png', 'start'),
  windmill_explain: new layer.Image('assets/windmill/explain.png'),
  windmill_explain_mask: new layer.Click_Mask('assets/windmill/explain_mask.png', 'start'),
  windmill_background: new layer.Image('assets/windmill/background.png'),
  windmill_maze: new layer.Click_Mask('assets/windmill/maze.png', 'hit', Trigger.Down),
  windmill_maze_green1: new layer.Click_Mask('assets/windmill/maze_green1.png', 'hit', Trigger.Down),
  windmill_maze_green2: new layer.Click_Mask('assets/windmill/maze_green2.png', 'hit', Trigger.Down),
  windmill_maze_orange1: new layer.Click_Mask('assets/windmill/maze_orange1.png', 'hit', Trigger.Down),
  windmill_maze_orange2: new layer.Click_Mask('assets/windmill/maze_orange2.png', 'hit', Trigger.Down),
  windmill_maze_red1: new layer.Click_Mask('assets/windmill/maze_red1.png', 'hit', Trigger.Down),
  windmill_maze_red2: new layer.Click_Mask('assets/windmill/maze_red2.png', 'hit', Trigger.Down),
  windmill_working: new layer.Switch([new layer.GIF('assets/windmill/working.gif')]),
  windmill_next: new layer.Switch([
    new layer.Composite([
      new layer.Image('assets/nav/next.png'),
      new layer.Click_Mask('assets/nav/next_mask.png', 'next')
    ])]),
  windmill_completed: new layer.Video('assets/windmill/completed.mp4'),

  // Opening the bottle
  get_bottle: new layer.Video('assets/bottle/get_bottle.mp4'),
  click_bottle: new layer.Video('assets/bottle/click_bottle.mp4', { loop: true }),
  open_bottle: new layer.Video('assets/bottle/open_bottle.mp4'),
  map: new layer.Video('assets/bottle/map.mp4', { loop: true })
}

const views = {
  loading: layers.intro_hourglass,
  intro_dunes: new layer.Composite([
    layers.intro_dunes,
    new layer.Click_Anywhere('continue')
  ]),
  intro_crab: layers.intro_crab,
  intro_crab_nav: new layer.Composite([
    layers.intro_crab,
    layers.nav_rewind,
    layers.nav_next
  ]),
  intro_sea: layers.intro_sea,
  intro_sea_nav: new layer.Composite([
    layers.intro_sea,
    layers.nav_rewind,
    layers.nav_next
  ]),
  intro_hand: layers.intro_hand,
  intro_hand_nav: new layer.Composite([
    layers.intro_hand,
    layers.nav_rewind,
    layers.nav_next
  ]),
  intro_shell: layers.intro_shell,
  intro_shell_pickup: layers.intro_shell_pickup,
  intro_welcome: new layer.Composite([
    layers.intro_welcome,
    layers.nav_next
  ]),
  intro_load: layers.intro_load,
  intro_character: new layer.Composite([
    layers.character_background,
    layers.character_selection,
    layers.character_characters,
    layers.character_mask,
    layers.character_start_mask
  ]),

  // Side-scroll landscape
  landscape: new layer.Sidescroll(
    new layer.Composite([
      layers.landscape_bg,
      layers.landscape_lmask,
      layers.landscape_rmask
    ]),
    layers.landscape_nav,
    5760, 1920, -1950),
  landscape_get_star: new layer.Composite([
    layers.landscape_get_star,
    new layer.Click_Anywhere('continue')
  ]),

  // Garden minigame
  garden_intro: new layer.Composite([
    layers.garden_intro,
    layers.garden_start
  ]),
  garden_game: new layer.Composite([
    layers.garden_background,
    layers.garden_trashcan,
    new layer.Drag_to_Target(layers.garden_trashcan_mask, layers.garden_item1, 'trash'),
    new layer.Drag_to_Target(layers.garden_trashcan_mask, layers.garden_item2, 'trash'),
    new layer.Drag_to_Target(layers.garden_trashcan_mask, layers.garden_item3, 'trash'),
    new layer.Drag_to_Target(layers.garden_trashcan_mask, layers.garden_item4, 'trash'),
    new layer.Drag_to_Target(layers.garden_trashcan_mask, layers.garden_item5, 'trash'),
    new layer.Drag_to_Target(layers.garden_trashcan_mask, layers.garden_item6, 'trash'),
    new layer.Drag_to_Target(layers.garden_trashcan_mask, layers.garden_item7, 'trash'),
    new layer.Drag_to_Target(layers.garden_trashcan_mask, layers.garden_item8, 'trash')
  ]),
  garden_completed: new layer.Composite([
    layers.garden_completed,
    layers.nav_next
  ]),

  // Windmill minigame
  windmill_intro: new layer.Composite([
    layers.windmill_intro,
    layers.windmill_intro_mask
  ]),
  windmill_explain: new layer.Composite([
    layers.windmill_explain,
    layers.windmill_explain_mask
  ]),
  windmill_game: new layer.Composite([
    layers.windmill_background,
    new layer.Complete_Maze(
      layers.windmill_maze_green1,
      layers.windmill_maze_green2,
      layers.windmill_maze,
      20, 25, '#a5c000', 'black'
    ),
    new layer.Complete_Maze(
      layers.windmill_maze_orange1,
      layers.windmill_maze_orange2,
      layers.windmill_maze,
      20, 25, '#c25d00', 'black'
    ),
    new layer.Complete_Maze(
      layers.windmill_maze_red1,
      layers.windmill_maze_red2,
      layers.windmill_maze,
      20, 25, '#bb252e', 'black'
    ),
    layers.windmill_working,
    layers.windmill_next
  ]),
  windmill_completed: new layer.Composite([
    layers.windmill_completed,
    new layer.Click_Anywhere('open')
  ]),

  // Opening the bottle
  get_bottle: new layer.Composite([
    layers.get_bottle,
    new layer.Click_Anywhere('continue')
  ]),
  click_bottle: new layer.Composite([
    layers.click_bottle,
    new layer.Click_Mask('assets/bottle/bottle_mask.png', 'open')
  ]),
  open_bottle: layers.open_bottle,
  map: new layer.Composite([
    layers.map,
    new layer.Click_Mask('assets/bottle/map_mask.png', 'go')
  ])
}

const sounds = {
  sea: new Audio('assets/sound/sea.mp3'),
  trashcan: new Audio('assets/sound/trashcan.mp3'),
  connect: new Audio('assets/sound/connect.mp3'),
  error: new Audio('assets/sound/error.mp3')
}

const state = {
  cleanup: 0,
  connect: 0,
  windmill_completed: false,
  garden_completed: false
}

function play_sound(name: keyof typeof sounds) {
  sounds[name].load()
  sounds[name].play()
}

function set_landscape(start: boolean) {
  layers.landscape_bg.layers[0].stop()
  layers.landscape_bg.layers[1].stop()
  layers.landscape_bg.layers[2].stop()
  if (start) {
    if (state.windmill_completed) {
      layers.landscape_bg.index = 1
      layers.landscape_bg.layers[1].start()
    } else if (state.garden_completed) {
      layers.landscape_bg.index = 2
      layers.landscape_bg.layers[2].start()
    } else {
      layers.landscape_bg.index = 0
      layers.landscape_bg.layers[0].start()
    }
  }
}

function play_garden_trashcan_once() {
  layers.garden_trashcan.start()
  window.setTimeout(() => {
    layers.garden_trashcan.stop()
  }, 1220)
}

function set_character(color: string) {
  const colors = ['orange', 'yellow', 'green']
  layers.character_selection.index = colors.indexOf(color)
}

const events: Event_Map<keyof typeof views> = {
  loading: {
    loaded: () => {
      layers.intro_hourglass.stop()
      return 'intro_dunes'
    }
  },
  intro_dunes: {
    continue: () => {
      sounds.sea.loop = true
      sounds.sea.play()
      layers.intro_crab.start()
      return 'intro_crab'
    }
  },
  intro_crab: {
    finish: () => 'intro_crab_nav'
  },
  intro_crab_nav: {
    rewind: () => {
      layers.intro_crab.start()
      return 'intro_crab'
    },
    next: () => {
      layers.intro_sea.start()
      return 'intro_sea'
    }
  },
  intro_sea: {
    finish: () => 'intro_sea_nav'
  },
  intro_sea_nav: {
    rewind: () => {
      layers.intro_sea.start()
      return 'intro_sea'
    },
    next: () => {
      layers.intro_hand.start()
      return 'intro_hand'
    }
  },
  intro_hand: {
    finish: () => 'intro_hand_nav'
  },
  intro_hand_nav: {
    rewind: () => {
      layers.intro_hand.start()
      return 'intro_hand'
    },
    next: () => 'intro_shell'
  },
  intro_shell: {
    pickup: () => {
      layers.intro_shell_pickup.start()
      return 'intro_shell_pickup'
    }
  },
  intro_shell_pickup: {
    finish: () => {
      layers.intro_welcome.start()
      return 'intro_welcome'
    }
  },
  intro_welcome: {
    next: () => {
      layers.intro_welcome.stop()
      layers.intro_load.start()
      return 'intro_load'
    }
  },
  intro_load: {
    finish: () => {
      layers.intro_load.stop()
      layers.character_background.start()
      layers.character_characters.start()
      set_character('yellow')
      return 'intro_character'
    }
  },
  intro_character: {
    orange: () => {
      set_character('orange')
    },
    yellow: () => {
      set_character('yellow')
    },
    green: () => {
      set_character('green')
    },
    start: () => {
      layers.character_background.stop()
      layers.character_characters.stop()
      set_landscape(true)
      return 'landscape'
    }
  },

  // Side-scrolling landscape
  landscape: {
    farmer_left: () => {
      if (!state.windmill_completed) {
        set_landscape(false)
        layers.windmill_intro.start()
        return 'windmill_intro'
      }
    },
    farmer_right: () => {
      if (!state.garden_completed) {
        set_landscape(false)
        layers.garden_intro.start()
        return 'garden_intro'
      }
    }
  },
  landscape_get_star: {
    continue: () => {
      if (state.windmill_completed && state.garden_completed) {
        layers.get_bottle.start()
        return 'get_bottle'
      } else {
        set_landscape(true)
        return 'landscape'
      }
    }
  },

  // Garden minigame
  garden_intro: {
    start: () => {
      layers.garden_intro.stop()
      play_garden_trashcan_once()
      return 'garden_game'
    }
  },
  garden_game: {
    trash: () => {
      play_garden_trashcan_once()
      play_sound('trashcan')
      state.cleanup++
      if (state.cleanup == 8) {
        state.garden_completed = true
        layers.garden_completed.start()
        return 'garden_completed'
      }
    }
  },
  garden_completed: {
    next: () => {
      layers.landscape_get_star.start()
      return 'landscape_get_star'
    }
  },

  // Windmill minigame
  windmill_intro: {
    start: () => {
      layers.windmill_intro.stop()
      return 'windmill_explain'
    }
  },
  windmill_explain: {
    start: () => 'windmill_game'
  },
  windmill_game: {
    error: () => {
      play_sound('error')
    },
    solved: () => {
      play_sound('connect')
      state.connect++
      if (state.connect == 3) {
        state.windmill_completed = true
        layers.windmill_working.index = 0
        layers.windmill_working.layers[0].start()
        layers.windmill_next.index = 0
      }
    },
    next: () => {
      layers.windmill_completed.start()
      return 'windmill_completed'
    }
  },
  windmill_completed: {
    open: () => {
      layers.landscape_get_star.start()
      return 'landscape_get_star'
    }
  },

  // Opening the bottle
  get_bottle: {
    continue: () => {
      layers.click_bottle.start()
      return 'click_bottle'
    }
  },
  click_bottle: {
    open: () => {
      layers.click_bottle.stop()
      layers.open_bottle.start()
      return 'open_bottle'
    }
  },
  open_bottle: {
    finish: () => {
      layers.map.start()
      return 'map'
    }
  },
  map: {}
}

export const story = new Story<keyof typeof views>(
  views, events, 'loading')

export async function start() {
  // First load the load animation.
  await layers.intro_hourglass.load()
  layers.intro_hourglass.start()

  // Then load all other assets.
  const promises: Promise<void>[] = []
  for (let l in layers) {
    if (l != 'intro_hourglass') {
      promises.push(layers[l].load())
    }
  }
  await Promise.all(promises)
  story.trigger('loaded')
}
