<script setup>
import { computed, reactive, ref } from "vue"

import Block from './components/Block.vue'

const board = reactive(
  {
    foreArr: [
      [null, null, null, null, 'red', null, null, null, null,],
      [null, null, null, null, 'green', null, null, null, null,],
      [null, null, null, null, 'blue', null, null, null, null,],
      [null, null, null, null, null, null, null, null, null,],
      [null, null, null, null, null, null, null, null, null,],
      [null, null, null, null, null, null, null, null, null,],
      [null, null, null, null, null, null, null, null, null,],
      [null, null, null, null, null, null, null, null, null,],
      [null, null, null, null, null, null, null, null, null,],
      [null, null, null, null, null, null, null, null, null,],
      [null, null, null, null, null, null, null, null, null,],
      [null, null, null, null, null, null, null, null, null,],
      [null, null, null, null, null, null, null, null, null,],
      [null, null, null, null, null, null, null, null, null,],
      [null, null, null, null, null, null, null, null, null,],
    ],
    bgArr: [
      [null, null, null, null, null, null, null, null, null,],
      [null, null, null, null, null, null, null, null, null,],
      [null, null, null, null, null, null, null, null, null,],
      [null, null, null, null, null, null, null, null, null,],
      [null, null, null, null, null, null, null, null, null,],
      [null, null, null, null, null, null, null, null, null,],
      [null, null, null, null, null, null, null, null, null,],
      [null, null, null, null, null, null, null, null, null,],
      [null, null, null, null, null, null, null, null, null,],
      [null, null, null, null, null, null, null, null, null,],
      [null, null, null, null, null, null, null, null, null,],
      [null, null, null, null, null, null, null, null, null,],
      [null, null, null, null, null, null, null, null, null,],
      [null, null, null, null, null, null, null, null, null,],
      [null, null, null, null, null, null, null, null, null,],
    ],
  }
)


const coord = computed(() => {
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 9; j++) {
      if (!!board.foreArr[i][j]) {
        return [i, j]
      }
    }
  }

  return [0, 0]
})

function startInterval() {
  const inter = setInterval(() => {
    let x = coord.value[0]
    let y = coord.value[1]

    if (x + 3 >= 15 || !!board.bgArr[x + 3][y]) {
      // 1. 从前景到背景
      board.bgArr[x][y] = board.foreArr[x][y]
      board.bgArr[x + 1][y] = board.foreArr[x + 1][y]
      board.bgArr[x + 2][y] = board.foreArr[x + 2][y]

      //2. 执行消除
      clearBoard()

      // 3. 判断即将新增加的是否超出
      if (!!board.bgArr[2][4]) {
        clearInterval(inter)

        alert("游戏结束")
        return
      }

      // 4. 恢复前景
      board.foreArr = generateForeArr()
    } else {
      const a = board.foreArr[x][y]
      const b = board.foreArr[x + 1][y]
      const c = board.foreArr[x + 2][y]

      board.foreArr[x][y] = null
      board.foreArr[x + 1][y] = a
      board.foreArr[x + 2][y] = b
      board.foreArr[x + 3][y] = c
    }
  }, 500)
}

function generateForeArr() {
  const allColors = ['red', 'green', 'blue', 'yellow', 'fuchsia']
  const c1 = allColors[Math.floor(Math.random() * 5)]
  const c2 = allColors[Math.floor(Math.random() * 5)]
  const c3 = allColors[Math.floor(Math.random() * 5)]
  return [
    [null, null, null, null, c1, null, null, null, null,],
    [null, null, null, null, c2, null, null, null, null,],
    [null, null, null, null, c3, null, null, null, null,],
    [null, null, null, null, null, null, null, null, null,],
    [null, null, null, null, null, null, null, null, null,],
    [null, null, null, null, null, null, null, null, null,],
    [null, null, null, null, null, null, null, null, null,],
    [null, null, null, null, null, null, null, null, null,],
    [null, null, null, null, null, null, null, null, null,],
    [null, null, null, null, null, null, null, null, null,],
    [null, null, null, null, null, null, null, null, null,],
    [null, null, null, null, null, null, null, null, null,],
    [null, null, null, null, null, null, null, null, null,],
    [null, null, null, null, null, null, null, null, null,],
    [null, null, null, null, null, null, null, null, null,],
  ]
}

function clearBoard() {
  let targetSet = new Set()

  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 9; j++) {

      if (!board.bgArr[i][j]) {
        continue
      }

      // 右
      if (
        j + 2 < 9 &&
        board.bgArr[i][j] === board.bgArr[i][j + 1] &&
        board.bgArr[i][j] === board.bgArr[i][j + 2]
      ) {
        targetSet.add(`${i}_${j}`)
        targetSet.add(`${i}_${j + 1}`)
        targetSet.add(`${i}_${j + 2}`)
      }

      // 下
      if (
        i + 2 < 15 &&
        board.bgArr[i][j] === board.bgArr[i + 1][j] &&
        board.bgArr[i][j] === board.bgArr[i + 2][j]
      ) {
        targetSet.add(`${i}_${j}`)
        targetSet.add(`${i + 1}_${j}`)
        targetSet.add(`${i + 2}_${j}`)
      }

      // 右下
      if (
        i + 2 < 15 &&
        j + 2 < 9 &&
        board.bgArr[i][j] === board.bgArr[i + 1][j + 1] &&
        board.bgArr[i][j] === board.bgArr[i + 2][j + 2]
      ) {
        targetSet.add(`${i}_${j}`)
        targetSet.add(`${i + 1}_${j + 1}`)
        targetSet.add(`${i + 2}_${j + 2}`)
      }

      // 左下
      if (
        i + 2 < 15 &&
        j - 2 >= 0 &&
        board.bgArr[i][j] === board.bgArr[i + 1][j - 1] &&
        board.bgArr[i][j] === board.bgArr[i + 2][j - 2]
      ) {
        targetSet.add(`${i}_${j}`)
        targetSet.add(`${i + 1}_${j - 1}`)
        targetSet.add(`${i + 2}_${j - 2}`)
      }
    }
  }


  if (targetSet.size > 0) {
    // 1. 执行清除
    for (let item of targetSet) {
      const arr = item.split('_')
      board.bgArr[parseInt(arr[0])][parseInt(arr[1])] = null
    }

    // 2. 补全空格
    let tempArr = [...board.bgArr]
    for (let j = 8; j >= 0; j--) { // 列
      let filteredArr = []

      for (let i = 14; i >= 0; i--) { // 行
        if (!!tempArr[i][j]) {
          filteredArr.push(tempArr[i][j])
        }

        tempArr[i][j] = null
      }

      for (let t = 0; t < filteredArr.length; t++) { // 行
        tempArr[14 - t][j] = filteredArr[t]
      }
    }

    board.bgArr = [...tempArr]

    // 3. 循环 clearBoard
    clearBoard()
  }
}

function moveY(offset) {
  const x = coord.value[0]
  const y = coord.value[1]

  if (y + offset < 0 || y + offset > 8) {
    return
  }

  if (!board.bgArr[x][y + offset] && !board.bgArr[x + 1][y + offset] && !board.bgArr[x + 2][y + offset]) {
    let tmpArr = [...board.foreArr]

    tmpArr[x][y + offset] = tmpArr[x][y]
    tmpArr[x + 1][y + offset] = tmpArr[x + 1][y]
    tmpArr[x + 2][y + offset] = tmpArr[x + 2][y]

    tmpArr[x][y] = null
    tmpArr[x + 1][y] = null
    tmpArr[x + 2][y] = null


    board.foreArr = [...tmpArr]
  }
}

function moveDown() {
  const x = coord.value[0]
  const y = coord.value[1]

  if (x + 2 + 1 > 14 || !!board.bgArr[x + 2 + 1][y]) {
    return
  }

  {
    let tmpArr = [...board.foreArr]

    tmpArr[x + 2 + 1][y] = tmpArr[x + 2][y]
    tmpArr[x + 1 + 1][y] = tmpArr[x + 1][y]
    tmpArr[x + 1][y] = tmpArr[x][y]

    tmpArr[x][y] = null

    board.foreArr = [...tmpArr]
  }
}

function moveUp() {
  const x = coord.value[0]
  const y = coord.value[1]

  let tmpArr = [...board.foreArr]
  const c1 = tmpArr[x][y]
  const c2 = tmpArr[x + 1][y]
  const c3 = tmpArr[x + 2][y]

  tmpArr[x][y] = c3
  tmpArr[x + 1][y] = c1
  tmpArr[x + 2][y] = c2

  board.foreArr = [...tmpArr]
}


startInterval()


document.addEventListener('keydown', function (e) {
  console.log(e.code)

  switch (e.code) {
    case 'ArrowLeft':// left  37
    case 'KeyA':// left  37
      moveY(-1)
      break
    case 'ArrowRight':// right 39
    case 'KeyD':// right 39
      moveY(1)
      break
    case 'ArrowDown':// down 40
    case 'KeyS'://
      moveDown()
      break
    case 'ArrowUp':// up
    case 'KeyW':
      moveUp()
      break
  }
})

</script>

<template>
  <div class="container mx-auto pt-40">
    <div class="border border-black flex justify-between items-stretch">
      <div class="relative">
        <div class="absolute top-0 left-0">
          <div
            v-for="i in 15"
            :key="i"
          >
            <div class="flex">
              <Block
                v-for="j in 9"
                :key="j"
                :data-key="`${i-1}-${j-1}`"
                border-color="border-slate-100"
                :color="board.foreArr[i-1][j-1] ? board.foreArr[i-1][j-1] :''"
              />
            </div>
          </div>
        </div>


        <div class="bg-gradient-to-br from-violet-100 to-teal-50">
          <div
            v-for="i in 15"
            :key="i"
            class="border-r"
          >
            <div class="flex">
              <Block
                v-for="j in 9"
                :key="j"
                :data-key="`${i-1}-${j-1}`"
                border-color="border-slate-100"
                :color="board.bgArr[i-1][j-1] ? board.bgArr[i-1][j-1] :''"
              />
            </div>
          </div>
        </div>

      </div>


      <div class="flex-auto border-l border-black">
        abcd
      </div>
    </div>
  </div>
</template>