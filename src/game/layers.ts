// Game Layers
// ===========

import * as m from '../util/math'
import * as layer from '../layer/all'
import { Layer, Trigger } from '../story'

function garden_item_layer(name: string) {
  return new layer.Composite([
    new layer.Image(`assets/garden/items/${name}.png`),
    new layer.Click_Mask(`assets/garden/items/${name}_mask.png`, 'drag', Trigger.Down),
  ])
}

function garden_water_layer(index: number) {
  return new layer.Composite([
    new layer.Image(`assets/flower/water${index}.png`),
    new layer.Click_Mask(`assets/flower/water${index}_mask.png`, 'drag', Trigger.Down),
  ])
}

export const layers = {
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
  character_back: new layer.Switch([
    new layer.Image('assets/character/orange_back.png'),
    new layer.Image('assets/character/yellow_back.png'),
    new layer.Image('assets/character/green_back.png')
  ]),
  frame_stars: new layer.Switch([
    new layer.Image('assets/frame/one_star.png'),
    new layer.Image('assets/frame/two_stars.png'),
    new layer.Image('assets/frame/three_stars.png'),
    new layer.Image('assets/frame/four_stars.png'),
  ]),

  // Side-scroll landscape
  landscape_bg: new layer.Switch([
    new layer.Video('assets/landscape/bg_sad_sad.mp4', { loop: true, resize: m.vec2(5760, 1080) }),
    new layer.Video('assets/landscape/bg_happy_sad.mp4', { loop: true, resize: m.vec2(5760, 1080) }),
    new layer.Video('assets/landscape/bg_sad_happy.mp4', { loop: true, resize: m.vec2(5760, 1080) })
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
  bottle_get: new layer.Video('assets/bottle/get.mp4'),
  bottle_click: new layer.Video('assets/bottle/click.mp4', { loop: true }),
  bottle_click_mask: new layer.Click_Mask('assets/bottle/click_mask.png', 'open'),
  bottle_open: new layer.Video('assets/bottle/open.mp4'),
  bottle_map: new layer.Video('assets/bottle/map.mp4', { loop: true }),
  bottle_map_mask: new layer.Click_Mask('assets/bottle/map_mask.png', 'go'),

  // Flower minigame
  flower_intro: new layer.Video('assets/flower/intro.mp4', { loop: true }),
  flower_background: new layer.Video('assets/flower/background.mp4'),
  flower_explain: new layer.Image('assets/flower/explain.png'),
  flower_explain_mask: new layer.Click_Mask('assets/flower/explain_mask.png', 'start'),
  flower_target_mask: new layer.Click_Mask('assets/flower/target_mask.png', 'drop', Trigger.Up),
  flower_water1: garden_water_layer(1),
  flower_water2: garden_water_layer(2),
  flower_water3: garden_water_layer(3),
  flower_water4: garden_water_layer(4),
  flower_water5: garden_water_layer(5),
  flower_completed: new layer.Video('assets/flower/completed.mp4', { loop: true })
}
