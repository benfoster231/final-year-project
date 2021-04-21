import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTS } from './all/constants/constants';
import { IndexComponent } from './all/layout/content/index/index.component';
import { HomeModule } from './all/layout/content/home/home.module';
import { ExerciseFiguresModule } from './all/layout/content/exercise-figures/exercise-figures.module';
import { ExerciseCalorieCalculatorModule } from './all/layout/content/exercise-calorie-calculator/exercise-calorie-calculator.module';
import { ExerciseMacroCalculatorModule } from './all/layout/content/exercise-macro-calculator/exercise-macro-calculator.module';
import { ExerciseOneRepMaxToolModule } from './all/layout/content/exercise-one-rep-max-tool/exercise-one-rep-max-tool.module';
import { GymListModule } from './all/layout/content/gym-list/gym-list.module';
import { GymDetailModule } from './all/layout/content/gym-detail/gym-detail.module';

const routes: Routes = [
  {
    path: ROUTS.INDEX_PAGE,
    component: IndexComponent
  },
  {
    path: ROUTS.HOME_PAGE,
    loadChildren: () => import('./all/layout/content/home/home.module').then(m => m.HomeModule)
  },
  {
    path: ROUTS.EXERCISE_FIGURES_PAGE,
    loadChildren: () => import('./all/layout/content/exercise-figures/exercise-figures.module').then(m => m.ExerciseFiguresModule)
  },
  {
    path: ROUTS.EXERCISE_CALORIE_CALCULATOR_PAGE,
    loadChildren: () => import('./all/layout/content/exercise-calorie-calculator/exercise-calorie-calculator.module').then(m => m.ExerciseCalorieCalculatorModule)
  },
  {
    path: ROUTS.EXERCISE_MACRO_CALCULATOR_PAGE,
    loadChildren: () => import('./all/layout/content/exercise-macro-calculator/exercise-macro-calculator.module').then(m => m.ExerciseMacroCalculatorModule)
  },
  {
    path: ROUTS.EXERCISE_ONE_REP_MAX_TOOL_PAGE,
    loadChildren: () => import('./all/layout/content/exercise-one-rep-max-tool/exercise-one-rep-max-tool.module').then(m => m.ExerciseOneRepMaxToolModule)
  },
  {
    path: ROUTS.LIST_PAGE,
    loadChildren: () => import('./all/layout/content/gym-list/gym-list.module').then(m => m.GymListModule)
  },
  {
    path: ROUTS.GYM_DETAIL + ':id',
    loadChildren: () => import('./all/layout/content/gym-detail/gym-detail.module').then(m => m.GymDetailModule)
  },
  {
    path: ROUTS.STRECHES_PAGE+':type/:gender/:bodypart',
    loadChildren: () => import('./all/layout/content/gym-streches/gym-streches.module').then(m => m.GymStrechedModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
