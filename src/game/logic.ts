// Game Logic
// ==========

import { Story, Layer, Trigger, Event_Map } from '../story'
import { layers } from './layers'
import { views } from './views'

const state = {
  cleanup: 0,
  connect: 0,
  watered: 0,
  windmill_completed: false,
  garden_completed: false,
  flower_completed: false,
  cleanup_completed: false
}

const sounds = {
  sea: new Audio('assets/sound/sea.mp3'),
  guitar: new Audio('assets/sound/guitar.mp3'),
  click: new Audio('assets/sound/click.mp3'),
  trashcan: new Audio('assets/sound/trashcan.mp3'),
  completed: new Audio('assets/sound/completed.mp3'),
  connect: new Audio('assets/sound/connect.mp3'),
  error: new Audio('assets/sound/error.mp3'),
  water: new Audio('assets/sound/water.mp3')
}

function play_sound(name: keyof typeof sounds) {
  sounds[name].load()
  sounds[name].play()
}

function set_character(color: string) {
  const colors = ['orange', 'yellow', 'green']
  const index = colors.indexOf(color)
  layers.character_selection.index = index
  layers.character_back.index = index
}

function update_stars() {
  let s = layers.frame_stars
  s.index = -1
  if (state.windmill_completed) { s.index++ }
  if (state.garden_completed) { s.index++ }
  if (state.flower_completed) { s.index++ }
  if (state.cleanup_completed) { s.index++ }
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

let trashcan_timeout: number | undefined = undefined

function play_garden_trashcan_once() {
  layers.garden_trashcan.start()
  window.clearTimeout(trashcan_timeout)
  trashcan_timeout = window.setTimeout(() => {
    layers.garden_trashcan.stop()
  }, 1220)
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
      play_sound('click')
      layers.intro_crab.start()
      return 'intro_crab'
    },
    next: () => {
      play_sound('click')
      layers.intro_sea.start()
      return 'intro_sea'
    }
  },
  intro_sea: {
    finish: () => 'intro_sea_nav'
  },
  intro_sea_nav: {
    rewind: () => {
      play_sound('click')
      layers.intro_sea.start()
      return 'intro_sea'
    },
    next: () => {
      play_sound('click')
      layers.intro_hand.start()
      return 'intro_hand'
    }
  },
  intro_hand: {
    finish: () => 'intro_hand_nav'
  },
  intro_hand_nav: {
    rewind: () => {
      play_sound('click')
      layers.intro_hand.start()
      return 'intro_hand'
    },
    next: () => {
      play_sound('click')
      return 'intro_shell'
    }
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
      play_sound('click')
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
      play_sound('click')
      set_character('orange')
    },
    yellow: () => {
      play_sound('click')
      set_character('yellow')
    },
    green: () => {
      play_sound('click')
      set_character('green')
    },
    start: () => {
      play_sound('click')
      layers.character_background.stop()
      layers.character_characters.stop()
      sounds.sea.pause()
      sounds.guitar.loop = true
      sounds.guitar.play()
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
      update_stars()
      if (state.windmill_completed && state.garden_completed) {
        layers.bottle_get.start()
        return 'bottle_get'
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
        play_sound('completed')
        state.garden_completed = true
        layers.garden_completed.start()
        return 'garden_completed'
      }
    }
  },
  garden_completed: {
    next: () => {
      play_sound('click')
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
    start: () => {
      play_sound('click')
      return 'windmill_game'
    }
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
      play_sound('completed')
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
  bottle_get: {
    continue: () => {
      layers.bottle_click.start()
      return 'bottle_click'
    }
  },
  bottle_click: {
    open: () => {
      layers.bottle_click.stop()
      layers.bottle_open.start()
      return 'bottle_open'
    }
  },
  bottle_open: {
    finish: () => {
      layers.bottle_map.start()
      return 'bottle_map'
    }
  },
  bottle_map: {
    go: () => {
      layers.flower_intro.start()
      return 'flower_intro'
    }
  },

  // Flower minigame
  flower_intro: {
    next: () => {
      play_sound('click')
      layers.flower_intro.stop()
      return 'flower_explain'
    }
  },
  flower_explain: {
    start: () => {
      layers.flower_background.start()
      const interval_id = window.setInterval(() => {
        if (state.flower_completed) {
          window.clearInterval(interval_id)
        } else {
          const v = layers.flower_background.video
          if (v.currentTime / v.duration >= state.watered / 5) {
            layers.flower_background.stop()
          }
        }
      }, 100)
      return 'flower_game'
    }
  },
  flower_game: {
    water: () => {
      play_sound('water')
      state.watered++
      layers.flower_background.continue()
      if (state.watered == 5) {
        state.flower_completed = true
        return 'flower_done'
      }
    }
  },
  flower_done: {
    next: () => {
      play_sound('completed')
      layers.flower_completed.start()
      return 'flower_completed'
    }
  },
  flower_completed: {
    continue: () => {
      update_stars()
      layers.flower_completed.stop()
      return 'cleanup_walk'
    }
  },

  // Cleanup minigame
  cleanup_walk: {
    walk: () => {
      layers.cleanup_walk.continue()
    },
    pause: () => {
      layers.cleanup_walk.stop()
    },
    finish: () => 'cleanup_walk_end'
  },
  cleanup_walk_end: {
    next: () => {
      play_sound('click')
      layers.cleanup_intro.start()
      return 'cleanup_intro'
    }
  },
  cleanup_intro: {
    continue: () => {
      layers.cleanup_intro.stop()
      return 'cleanup_game'
    }
  },
  cleanup_game: {
    erased: () => {
      play_sound('completed')
      state.cleanup_completed = true
      layers.cleanup_drinking.start()
      return 'cleanup_drinking'
    }
  },
  cleanup_drinking: {
    next: () => {
      play_sound('click')
      layers.cleanup_drinking.stop()
      layers.cleanup_completed.start()
      return 'cleanup_completed'
    }
  },
  cleanup_completed: {
    next: () => {
      update_stars()
    }
  }
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
