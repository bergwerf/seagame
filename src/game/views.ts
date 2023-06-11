// Game Views
// ==========

import * as layer from '../layer/all'
import { Layer, Trigger } from '../story'
import { layers } from './layers'

export const views = {
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
  landscape: new layer.Composite([
    new layer.Sidescroll(
      new layer.Composite([
        layers.landscape_bg,
        layers.landscape_lmask,
        layers.landscape_rmask
      ]),
      layers.landscape_nav,
      5760, 1920, -1950),
    layers.character_back,
    layers.frame_stars
  ]),
  landscape_get_star: new layer.Composite([
    layers.landscape_get_star,
    new layer.Click_Anywhere('continue'),
    layers.frame_stars
  ]),

  // Garden minigame
  garden_intro: new layer.Composite([
    layers.garden_intro,
    layers.garden_start,
    layers.frame_stars
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
    new layer.Drag_to_Target(layers.garden_trashcan_mask, layers.garden_item8, 'trash'),
    layers.frame_stars
  ]),
  garden_completed: new layer.Composite([
    layers.garden_completed,
    layers.nav_next,
    layers.frame_stars
  ]),

  // Windmill minigame
  windmill_intro: new layer.Composite([
    layers.windmill_intro,
    layers.windmill_intro_mask,
    layers.frame_stars
  ]),
  windmill_explain: new layer.Composite([
    layers.windmill_explain,
    layers.windmill_explain_mask,
    layers.frame_stars
  ]),
  windmill_game: new layer.Composite([
    layers.windmill_background,
    new layer.Complete_Maze(
      layers.windmill_maze_red1,
      layers.windmill_maze_red2,
      layers.windmill_maze,
      20, 25, '#bb252e', 'black'
    ),
    new layer.Complete_Maze(
      layers.windmill_maze_orange1,
      layers.windmill_maze_orange2,
      layers.windmill_maze,
      20, 25, '#c25d00', 'black'
    ),
    new layer.Complete_Maze(
      layers.windmill_maze_green1,
      layers.windmill_maze_green2,
      layers.windmill_maze,
      20, 25, '#a5c000', 'black'
    ),
    layers.windmill_working,
    layers.windmill_next,
    layers.frame_stars
  ]),
  windmill_completed: new layer.Composite([
    layers.windmill_completed,
    new layer.Click_Anywhere('open'),
    layers.frame_stars
  ]),

  // Opening the bottle
  bottle_get: new layer.Composite([
    layers.bottle_get,
    new layer.Click_Anywhere('continue'),
    layers.frame_stars
  ]),
  bottle_click: new layer.Composite([
    layers.bottle_click,
    layers.bottle_click_mask,
    layers.frame_stars
  ]),
  bottle_open: layers.bottle_open,
  bottle_map: new layer.Composite([
    layers.bottle_map,
    layers.bottle_map_mask,
    layers.frame_stars
  ]),

  // Flower minigame
  flower_intro: new layer.Composite([
    layers.flower_intro,
    layers.nav_next,
    layers.frame_stars
  ]),
  flower_explain: new layer.Composite([
    layers.flower_explain,
    layers.flower_explain_mask,
    layers.frame_stars
  ]),
  flower_game: new layer.Composite([
    layers.flower_background,
    new layer.Drag_to_Target(layers.flower_target_mask, layers.flower_water1, 'water'),
    new layer.Drag_to_Target(layers.flower_target_mask, layers.flower_water2, 'water'),
    new layer.Drag_to_Target(layers.flower_target_mask, layers.flower_water3, 'water'),
    new layer.Drag_to_Target(layers.flower_target_mask, layers.flower_water4, 'water'),
    new layer.Drag_to_Target(layers.flower_target_mask, layers.flower_water5, 'water'),
    layers.frame_stars
  ]),
  flower_done: new layer.Composite([
    layers.flower_background,
    layers.nav_next,
    layers.frame_stars
  ]),
  flower_completed: new layer.Composite([
    layers.flower_completed,
    new layer.Click_Anywhere('continue'),
    layers.frame_stars
  ]),

  // Cleanup minigame
  cleanup_walk: new layer.Composite([
    layers.cleanup_walk,
    layers.character_back,
    new layer.Click_Anywhere('walk', Trigger.Down),
    new layer.Click_Anywhere('pause', Trigger.Up),
    layers.frame_stars
  ]),
  cleanup_walk_end: new layer.Composite([
    layers.cleanup_walk,
    layers.character_back,
    layers.nav_next,
    layers.frame_stars
  ]),
  cleanup_intro: new layer.Composite([
    layers.cleanup_intro,
    new layer.Click_Anywhere('continue'),
    layers.frame_stars
  ]),
  cleanup_game: new layer.Composite([
    layers.cleanup_background,
    layers.cleanup_viezesloot,
    layers.frame_stars
  ]),
  cleanup_drinking: new layer.Composite([
    layers.cleanup_drinking,
    layers.nav_next,
    layers.frame_stars
  ]),
  cleanup_completed: new layer.Composite([
    layers.cleanup_completed,
    layers.nav_next,
    layers.frame_stars
  ]),

  // Game finish
  finish_happy: new layer.Composite([
    layers.finish_happy,
    layers.nav_next,
    layers.frame_stars
  ]),
  finish_cake: layers.finish_cake
}
