## Add lib

`nx g lib shared`

## Add component to lib

`nx g c horizontal-card --project=shared --export`

## Add feature lib

`nx g lib feat-home --directory=wivipro --routing --lazy --simpleModuleName --parentModule=apps/wivipro/src/app/app.module.ts`

## Add component to feature lib

`nx g c home --project=wivipro-feat-home --flat --export --skipTests`
