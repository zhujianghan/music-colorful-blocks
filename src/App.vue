<script setup>
import { computed, reactive, ref } from "vue"

import Block from './components/Block.vue'
import ThemeSelect from './components/ThemeSelect.vue'

const board = reactive(
  {
    foreArr: [
      [null, null, null, null, 'primary', null, null, null, null,],
      [null, null, null, null, 'secondary', null, null, null, null,],
      [null, null, null, null, 'accent', null, null, null, null,],
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
    active: false,
    timeout: 400,
    numOfColors: 5,
    showText: 'false',
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

async function toggleActive() {
  board.active = !board.active

  for (; board.active;) {
    let x = coord.value[0]
    let y = coord.value[1]

    if (x + 3 >= 15 || !!board.bgArr[x + 3][y]) {
      // 1. 从前景到背景
      board.bgArr[x][y] = board.foreArr[x][y]
      board.bgArr[x + 1][y] = board.foreArr[x + 1][y]
      board.bgArr[x + 2][y] = board.foreArr[x + 2][y]

      // 清除前景
      board.foreArr[x][y] = null
      board.foreArr[x + 1][y] = null
      board.foreArr[x + 2][y] = null

      //2. 执行消除
      await clearBoard()

      // 3. 判断即将新增加的是否超出
      if (!!board.bgArr[2][4]) {
        alert("游戏结束")
        location.reload()
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

    await sleep(board.timeout)
  }
}

function generateForeArr() {
  const allColors = ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error', 'neutral']
  const c1 = allColors[Math.floor(Math.random() * board.numOfColors)]
  const c2 = allColors[Math.floor(Math.random() * board.numOfColors)]
  const c3 = allColors[Math.floor(Math.random() * board.numOfColors)]
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

async function clearBoard() {
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
      console.log(item, "item")
      const arr = item.split('_')
      board.bgArr[parseInt(arr[0])][parseInt(arr[1])] = null
    }
    await sleep(200)

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
    await sleep(200)

    // 3. 循环 clearBoard
    await clearBoard()
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

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time))
}

document.addEventListener('keydown', function (e) {
  if (e.code === 'Space') {
    toggleActive()
  }

  if (!board.active) {
    return
  }

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
  <div class="max-w-screen-md mx-auto pt-40">
    <div class="border border-slate-500 flex justify-between items-stretch">
      <div class="relative">
        <div class="absolute top-0 left-0">
          <div
            v-for="i in 15"
            :key="i"
          >
            <div class="flex">
              <Block
                border-color="border-slate-100"
                :show-text="board.showText === 'true'"
                v-for="j in 9"
                :key="j"
                :data-key="`${i-1}-${j-1}`"
                :color="board.foreArr[i-1][j-1] ? board.foreArr[i-1][j-1] :''"
              />
            </div>
          </div>
        </div>


        <div class="bg-base-300">
          <div
            v-for="i in 15"
            :key="i"
            class="border-r"
          >
            <div class="flex">
              <Block
                border-color="border-slate-100"
                :show-text="board.showText === 'true'"
                v-for="j in 9"
                :key="j"
                :data-key="`${i-1}-${j-1}`"
                :color="board.bgArr[i-1][j-1] ? board.bgArr[i-1][j-1] :''"
              />
            </div>
          </div>
        </div>

      </div>

      <div class="flex-auto border-l border-slate-500 p-4">
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <div class="w-1/2 font-bold">Theme</div>
            <ThemeSelect :board-active="board.active"/>
          </div>

          <div class="flex justify-between items-center">
            <div class="w-1/2 font-bold">Speed</div>
            <select class="flex-grow w-full max-w-xs rounded p-2 bg-base-500" v-model="board.timeout"
                    :disabled="board.active">
              <option value="50">F5</option>
              <option value="100">F4</option>
              <option value="150">F3</option>
              <option value="200">F2</option>
              <option value="300">F1</option>
              <option value="400">Normal</option>
              <option value="500">L1</option>
              <option value="600">L2</option>
              <option value="700">L3</option>
              <option value="800">L4</option>
            </select>
          </div>

          <div class="flex justify-between items-center">
            <div class="w-1/2 font-bold">Num of Colors</div>
            <select
              class="flex-grow w-full max-w-xs rounded p-2 bg-base-500"
              v-model="board.numOfColors"
              :disabled="board.active"
            >
              <option v-for="i in [3,4,5,6,7,8]" :value="i" :key="i">{{ i }}</option>
            </select>
          </div>

          <div class="flex justify-between items-center">
            <div class="w-1/2 font-bold">Show Text</div>
            <select
              class="flex-grow w-full max-w-xs rounded p-2 bg-base-500"
              v-model="board.showText"
              :disabled="board.active"
            >
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </div>
        </div>

        <div class="mt-36 space-y-10">
          <div>
            <div>⬆️to change color</div>
            <div>⬅️➡️⬇️to move</div>
            <div>⬅️➡️⬇️to move</div>
          </div>

          <div class="text-center">
            <div
              class="rounded py-3 text-white w-full cursor-pointer"
              :class="{'bg-success': !board.active, 'bg-neutral': board.active}"
              @click="toggleActive"
            >
              {{ board.active ? 'STOP' : 'START' }}
            </div>
            <p class="text-xs">Press 「SPACE」 to toggle START/STOP</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>