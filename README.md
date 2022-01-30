## Add feature lib

`nx g lib home --directory=wivipro --routing --lazy --simpleModuleName --parentModule=apps/wivipro/src/app/app.module.ts`

## Add component to feature lib

`nx g c home --project=wivipro-home --flat --export --skipTests`
