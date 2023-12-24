controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    rotate(true)
})
function createSingleBlock (xoff: number, yoff: number) {
    mySprite = sprites.create(img`
        7 7 7 7 7 7 7 7 
        7 1 1 1 1 1 1 7 
        7 1 7 7 7 7 4 7 
        7 1 7 7 7 7 4 7 
        7 1 7 7 7 7 4 7 
        7 1 7 7 7 7 4 7 
        7 1 4 4 4 4 4 7 
        7 7 7 7 7 7 7 7 
        `, SpriteKind.Player)
    sprites.setDataNumber(mySprite, "offset_x", xoff)
    sprites.setDataNumber(mySprite, "offset_y", yoff)
    mySprite.setPosition(CoreX + 8 * xoff, CoreY + 8 * yoff)
    return mySprite
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    rotate(false)
})
function createBlocks (shape: string) {
    listCurBrick.push(createSingleBlock(0, 0))
    if (shape == "Z") {
        listCurBrick.push(createSingleBlock(0, 1))
        listCurBrick.push(createSingleBlock(1, 0))
        listCurBrick.push(createSingleBlock(1, -1))
    } else if (shape == "T") {
        listCurBrick.push(createSingleBlock(0, 1))
        listCurBrick.push(createSingleBlock(1, 0))
        listCurBrick.push(createSingleBlock(-1, 0))
    } else if (shape == "7") {
        listCurBrick.push(createSingleBlock(0, 1))
        listCurBrick.push(createSingleBlock(-1, 0))
        listCurBrick.push(createSingleBlock(0, 2))
    } else if (shape == "L") {
        listCurBrick.push(createSingleBlock(1, 0))
        listCurBrick.push(createSingleBlock(0, -1))
        listCurBrick.push(createSingleBlock(0, -2))
    } else if (shape == "1") {
        listCurBrick.push(createSingleBlock(0, 1))
        listCurBrick.push(createSingleBlock(0, -1))
        listCurBrick.push(createSingleBlock(0, -2))
    } else if (shape == "S") {
        listCurBrick.push(createSingleBlock(-1, 0))
        listCurBrick.push(createSingleBlock(0, -1))
        listCurBrick.push(createSingleBlock(1, -1))
    } else if (shape == "O") {
        listCurBrick.push(createSingleBlock(1, 0))
        listCurBrick.push(createSingleBlock(0, -1))
        listCurBrick.push(createSingleBlock(1, -1))
    } else {
    	
    }
}
function rotate (is_clockwise: boolean) {
    for (let value of listCurBrick) {
        temp_x = sprites.readDataNumber(value, "offset_x")
        if (is_clockwise) {
            sprites.setDataNumber(value, "offset_x", 0 - sprites.readDataNumber(value, "offset_y"))
            sprites.setDataNumber(value, "offset_y", temp_x)
        } else {
            sprites.setDataNumber(value, "offset_x", sprites.readDataNumber(value, "offset_y"))
            sprites.setDataNumber(value, "offset_y", 0 - temp_x)
        }
        value.setPosition(CoreX + 8 * sprites.readDataNumber(value, "offset_x"), CoreY + 8 * sprites.readDataNumber(value, "offset_y"))
    }
}
let temp_x = 0
let mySprite: Sprite = null
let listCurBrick: Sprite[] = []
let CoreY = 0
let CoreX = 0
scene.setBackgroundColor(8)
CoreX = 80
CoreY = 60
listCurBrick = []
createBlocks("O")
