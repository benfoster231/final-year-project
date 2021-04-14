import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTS } from './all/constants/constants';
import { IndexComponent } from './all/layout/content/index/index.component';
import { HomeModule } from './all/layout/content/home/home.module';
import { ExerciseFiguresModule } from './all/layout/content/exercise-figures/exercise-figures.module';
import { ExerciseCalorieCalculatorModule } from './all/layout/content/exercise-calorie-calculator/exercise-calorie-calculator.module';
import { ExerciseMacroCalculatorModule } from './all/layout/content/exercise-macro-calculator/exercise-macro-calculator.module';
import { ExerciseOneRepMaxToolModule } from './all/layout/content/exercise-one-rep-max-tool/exercise-one-rep-max-tool.module';

const routes: Routes = [
  {
    path: ROUTS.INDEX_PAGE,
    component: IndexComponent
  },
  {
    path: ROUTS.HOME_PAGE,
    loadChildren: './all/layout/content/home/home.module#HomeModule'
  },
  {
    path: ROUTS.EXERCISE_FIGURES_PAGE,
    loadChildren: './all/layout/content/exercise-figures/exercise-figures.module#ExerciseFiguresModule'
  },
  {
    path: ROUTS.EXERCISE_CALORIE_CALCULATOR_PAGE,
    loadChildren: './all/layout/content/exercise-calorie-calculator/exercise-calorie-calculator.module#ExerciseCalorieCalculatorModule'
  },
  {
    path: ROUTS.EXERCISE_MACRO_CALCULATOR_PAGE,
    loadChildren: './all/layout/content/exercise-macro-calculator/exercise-macro-calculator.module#ExerciseMacroCalculatorModule'
  },
  {
    path: ROUTS.EXERCISE_ONE_REP_MAX_TOOL_PAGE,
    loadChildren: './all/layout/content/exercise-one-rep-max-tool/exercise-one-rep-max-tool.module#ExerciseOneRepMaxToolModule'
  },
  {
    path: ROUTS.STRECHES_PAGE,
    loadChildren: './all/layout/content/streches/streches.module#StrechesModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
