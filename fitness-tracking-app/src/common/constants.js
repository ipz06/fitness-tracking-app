export const WALK_MET = 3.5;
export const RUN_MET = 8;
export const BIKING_MET = 14;
export const GYM_MET = 11;
export const SWIMMING_MET = 8.5;
export const ROW_MET = 9;
export const EXERCISE_MET = 5;
export const YOGA_MET = 4;
export const USERNAME_MIN_LENGTH = 2;
export const USERNAME_MAX_LENGTH = 20;
export const MIN_PASSWORD_LENGTH = 6;
export const MAX_PASSWORD_LENGTH = 32;
export const MENU_ITEMS = ['DASHBOARD','GOALS','STATS','FRIENDS','MEALS']
export const MOBILE_MENU_ITEMS = ['DASHBOARD','GOALS','FRIENDS','MEALS','PROFILE','STATS']
export const redColor = '#e0041c'
export const WHITE_COLOR = 'white'
export const MONTH_MS = 30*24*3600*1000;
export const phoneRegex = /^\d{10}$/;
export const NAME_MIN_LENGTH = 1;
export const NAME_MAX_LENGTH = 20;
export const MIN_WEIGHT = 10;
export const MAX_WEIGHT = 500;
export const MIN_HEIGHT = 1;
export const MAX_HEIGHT = 4;
export const USER_TYPE = Object.freeze({
                                    'USER':1,
                                    'ADMIN':2,
                                    'BLOCKED':3,
                                    'SUPER_ADMIN':4,
                                 })
export const ACTIVITY_TYPE = Object.freeze(
   {
      RUNNING: 'Running',
      BIKING: 'Biking',
      WALKING: 'Walking',
      GYM: 'Gym',
      YOGA: 'Yoga',
      EXERCISE: 'Exercise',
      SWIMMING: 'Swim',
      ROW: 'Row',
   }
)
export const ONE_HOUR_IN_MIN = 60;

export const MEALS_TYPE = Object.freeze (
   {
      HEALTHY_BREAKFAST: 'Healthy Breakfast',
      BREAKFAST_FOR_GENTLEMEN: 'Breakfast for Gentlemen',
      ENERGETIC_START_OF_THE_DAY: 'Energetic Start of the Day',
      ON_THE_GO_SNACK: 'On-the-go Snack',
      SNACK: 'Snack',
      LUNCH_FOR_LADIES: 'Lunch for the Ladies',
      MUSCLE_LUNCH: 'Lunch for Muscles',
      HEALTHY_DINNER: 'Healthy Dinner',
      DINNER: 'Dinner',
      SALAD: 'Salad'   
   }
)

export const ICON_SIZE = "70px";
export const ICON_SIZE_BIGGER = "150px"
