
import React, { useRef, useEffect } from 'react'

const Protein = props => {
  const canvasRef = useRef(null)
  useEffect(() => {

    const formula = String(props.formula).split("")
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const debug = false;

    /* ===================== Settings ===================== */
    const bond_length = 45
    const bond_width = 2
    const font = "600 15px Arial"
    /* ===================== Settings ===================== */
    
    const amino_acids = {
        "G": {
            "structure": 
                "(NH₃)+S--SR--D'O'B++S[O]"
            ,
            "width":
                3
            ,
            "properties": {
    
            }
        },
        "P": {
            "structure": 
                "TR(NH₃)+JB++++S--S--S--ST+SR++D'O'B--S[O]"
            ,
            "width":
                3
            ,
            "properties": {
    
            }
        },
        "A": {
            "structure": 
                "(NH₃)+SR++HB--SR--D'O'B++S[O]"
            ,
            
            "width":
                3
            ,
            "properties": {
    
            }
        },
        "N": {
            "structure": 
                "(NH₃)+JR++S--S-S'NH₂'B++S--S++D'O'B--SR--D'O'B++S[O]"
            ,
            "width":
                3
            ,
            "properties": {
    
            }
        },
        "D": {
            "structure": 
                "(NH₃)+JR++S--S-S[O]B++S--S++D'O'B--SR--D'O'B++S[O]"
            ,
            "width":
                3
            ,
            "properties": {
    
            }
        },
        "C": {
            "structure": 
                "(NH₃)+JR++S--S'HS'B--SR--D'O'B++S[O]"
            ,
            "width":
                3
            ,
            "properties": {
    
            }
        },
        "Q": {
            "structure":
                "(NH₃)+JR++S--S++S--S'NH₂'B++S--S++S++D'O'B--SR--D'O'B++S[O]"
            ,
            "width":
                3
            ,
            "properties": {
    
            }
        },
        "E": {
            "structure":
                "(NH₃)+JR++S--S++S--S[O]B++S--S++S++D'O'B--SR--D'O'B++S[O]"
            ,
            "width":
                3
            ,
            "properties": {
    
            }
        },
        "H": {
            "structure":
                "(NH₃)+JR++S--S-ST'N'++D++S'NH'++S++DTB++SR++D'O'B--S[O]"
            ,
            "width":
                3
            ,
            "properties": {
    
            }
        },
        "I": {
            "structure":
                "(NH₃)+JR++S--S++SB++S++HB--SR--D'O'B++S[O]"
            ,
            "width":
                3
            ,
            "properties": {
    
            }
        },
        "L": {
            "structure": 
                "(NH₃)+JR++S--S-SB++S--S++SB--SR--D'O'B++S[O]"
            ,
            "width":
                3
            ,
            "properties": {
    
            }
        },
        "K": {
            "structure": 
                "(NH₃)+JR++S--S++S--S++S(NH₃)B--SR--D'O'B++S[O]"
            ,
            "width":
                3
            ,
            "properties": {
    
            }
        },
        "M": {
            "structure": 
                "(NH₃)+JR++S--S++S'S'--SB--SR--D'O'B++S[O]"
            ,
            "width":
                3
            ,
            "properties": {
    
            }
        },
        "F": {
            "structure": 
                "(NH₃)+JR++S--S--S++D++S++D++S++DB--SR--D'O'B++S[O]"
            ,
            "width":
                4
            ,
            "properties": {
    
            }
        },
        "S": {
            "structure": 
                "(NH₃)+JR++S--S'OH'B--SR--D'O'B++S[O]"
            ,
            "width":
                3
            ,
            "properties": {
    
            }
        },
        "T": {
            "structure": 
                "(NH₃)+JR++S--S'OH'B++S++SB--SR--D'O'B++S[O]"
            ,
            "width":
                3
            ,
            "properties": {
    
            }
        },
        "Y": {
            "structure": 
                "(NH₃)+JR++S--S--S++D++SB++S--S++D--S--D++S'OH'B--SR--D'O'B++S[O]"
            ,
            "width":
                5
            ,
            "properties": {
    
            }
        },
        "V": {
            "structure": 
                "(NH₃)+JR++S--SB++S++SB--SR--D'O'B++S[O]"
            ,
            "width":
                3
            ,
            "properties": {
    
            }
        },
        "U": {
            "structure": 
                "(NH₃)+JR++S--S[Se]B--SR--D'O'B++S[O]"
            ,
            "width":
                3
            ,
            "properties": {
    
            }
        },
        "R": {
            "structure": 
                "(NH₃)+JR++S--S++S--S'NH'++K--M'NH₂'++++++L--K'N₂H'++++++MCB--SR--D'O'B++S[O]"
            ,
            "width":
                4
            ,
            "properties": {
    
            }
        },
        "W": {
            "structure": 
                "(NH₃)+JR++S--STD++S'NH'++S++DY++S++D++S++D++S++DY++STB++SR++D'O'B--S[O]"
            ,
            "width":
                3.5
            ,
            "properties": {
    
            }
        }
    }

    const single_width = bond_length * Math.pow(3, 0.5) / 2
    const clearZones = []

    function setWidth(width) {
        canvas.width = width
    }

    function setHeight(height) {
        canvas.height = height
    }

    function draw_amino_acid(formula, starting_pos, node_type, reversed = false) {    
        function extract_molecule(i, lookup) {
            let mol = ""
            for (let j = i + 1; j < formula.length; ++j) {
                if (formula[j] != lookup) {
                    mol += j != i ? formula[j] : ""
                    continue
                }
                i = j
                return [mol, j]
            }
        }
    
        function draw_bond(previous_pos, current_angle, type) {
            const freq = 8;
            let next_pos = [
                previous_pos[0] + Math.cos(current_angle) * bond_length,
                previous_pos[1] + Math.sin(current_angle) * bond_length
            ]

            ctx.strokeStyle = "black"
            ctx.lineWidth = bond_width

            if (type == "single") {
                ctx.beginPath()
                ctx.moveTo(previous_pos[0], previous_pos[1])
                ctx.lineTo(next_pos[0], next_pos[1])
                ctx.stroke()
            } else if (type == "double") {
                if (debug) {
                    ctx.strokeStyle = "red"
                    ctx.beginPath()
                    ctx.moveTo(previous_pos[0], previous_pos[1])
                    ctx.lineTo(next_pos[0], next_pos[1])
                    ctx.stroke()
                } else {
                    ctx.beginPath()
                    const alpha = Math.atan((next_pos[1] - previous_pos[1]) / (next_pos[0] - previous_pos[0])) * (180 / Math.PI)
                    const beta = 90 - alpha
                    const a = Math.sin(beta * (Math.PI / 180)) * bond_width
                    const b = Math.cos(beta * (Math.PI / 180)) * bond_width
                    ctx.moveTo(previous_pos[0] + b, previous_pos[1] - a)
                    ctx.lineTo(next_pos[0] + b, next_pos[1] - a)
                    ctx.moveTo(previous_pos[0] - b, previous_pos[1] + a)
                    ctx.lineTo(next_pos[0] - b, next_pos[1] + a)
                    ctx.stroke()
                }
            } else if (type == "hydrogen_reversed") {
                if (debug) {
                    ctx.strokeStyle = "blue"
                    ctx.beginPath()
                    ctx.moveTo(previous_pos[0], previous_pos[1])
                    ctx.lineTo(next_pos[0], next_pos[1])
                    ctx.stroke()
                } else {
                    for (let i = 1; i <= freq; i++) {
                        ctx.beginPath()
                        ctx.ellipse(next_pos[0], next_pos[1], bond_length * .9 * (i / freq), bond_length * .9 * (i / freq),
    
                        Math.atan((previous_pos[1] - next_pos[1]) / (previous_pos[0] - next_pos[0])) + (next_pos[0] < previous_pos[0] ? 0 : Math.PI)
                        
                        , Math.PI / -30, Math.PI / 30)
                        ctx.stroke()
                    }
                }
            } else if (type == "hydrogen") {
                if (debug) {
                    ctx.strokeStyle = "blue"
                    ctx.beginPath()
                    ctx.moveTo(previous_pos[0], previous_pos[1])
                    ctx.lineTo(next_pos[0], next_pos[1])
                    ctx.stroke()
                } else {
                    for (let i = 1; i <= freq; i++) {
                        ctx.beginPath()
                        ctx.ellipse(previous_pos[0], previous_pos[1], bond_length * .9 * (i / freq), bond_length * .9 * (i / freq),
    
                        Math.atan((next_pos[1] - previous_pos[1]) / (next_pos[0] - previous_pos[0])) + (next_pos[0] >= previous_pos[0] ? 0 : Math.PI)
                        
                        , Math.PI / -30, Math.PI / 30)
                        ctx.stroke()
                    }
                }
            } else if (String(type).includes("one_and_half")) {
                if (debug) {
                    ctx.strokeStyle = "yellow"
                    ctx.beginPath()
                    ctx.moveTo(previous_pos[0], previous_pos[1])
                    ctx.lineTo(next_pos[0], next_pos[1])
                    ctx.stroke()
                } else {
                    const alpha = Math.atan((next_pos[1] - previous_pos[1]) / (next_pos[0] - previous_pos[0])) * (180 / Math.PI)
                    const beta = 90 - alpha
                    const a = Math.sin(beta * (Math.PI / 180)) * bond_width
                    const b = Math.cos(beta * (Math.PI / 180)) * bond_width
                    ctx.setLineDash(type == "one_and_half" ? [6, 3] : [])
                    ctx.moveTo(previous_pos[0] + b, previous_pos[1] - a)
                    ctx.lineTo(next_pos[0] + b, next_pos[1] - a)
                    ctx.stroke()
                    ctx.beginPath()
                    ctx.setLineDash(type == "one_and_half" ? [] : [5, 5])
                    ctx.moveTo(previous_pos[0] - b, previous_pos[1] + a)
                    ctx.lineTo(next_pos[0] - b, next_pos[1] + a)
                    ctx.stroke()
                    ctx.setLineDash([])
                    }
            } else if (type == "circle") {
                ctx.beginPath()
                ctx.fillStyle = "white"
                ctx.ellipse(previous_pos[0], previous_pos[1], bond_length / 4, bond_length / 4, 0, 0, 2 * Math.PI)
                ctx.fill()
                ctx.stroke()
                ctx.lineWidth = bond_width * 1.25
                ctx.beginPath()
                ctx.moveTo(previous_pos[0], previous_pos[1] - (bond_length / 7))
                ctx.lineTo(previous_pos[0], previous_pos[1] + (bond_length / 7))
                ctx.moveTo(previous_pos[0] - (bond_length / 7), previous_pos[1])
                ctx.lineTo(previous_pos[0] + (bond_length / 7), previous_pos[1])
                ctx.stroke()
            }
    
            return next_pos
        }
    
        function draw_molecule(m) {
            if (debug) {
                ctx.beginPath()
                ctx.fillStyle = "#0f0"
                ctx.ellipse(previous_pos[0], previous_pos[1], bond_length / 10, bond_length / 10, 0, 0, 2 * Math.PI)
                ctx.fill()
            } else {
                const tempCanvas = document.createElement("canvas")
                const tempCtx = tempCanvas.getContext("2d")
                tempCtx.font = font
                const metrics = tempCtx.measureText(m).width
                clearZones.push([previous_pos[0], previous_pos[1], metrics, m])
            }
        }
    
        let previous_pos = starting_pos
        let ending_position = starting_pos
        let current_angle = 0
        let angle = (!reversed ? 1 : -1) * Math.PI / 6
        let checkpoint = [[0, 0], 0]
        let m = ""
        let i = 0
        
    
        while (i < formula.length) {
            switch (formula[i]) {
                case "(":
                    [m, i] = extract_molecule(i, ")")
                    m = `⁺${m}`
                    if (node_type != "start" && m == "⁺NH₃")
                        m = "NH"
                    draw_molecule(m)
                    break
                case "[":
                    ending_position = previous_pos;
                    [m, i] = extract_molecule(i, "]")
                    m += "⁻"
                    draw_molecule(m)
                    break
                case "'":
                    [m, i] = extract_molecule(i, "'")
                    draw_molecule(m)
                    break
                case "M": // only move
                    previous_pos = draw_bond(
                        previous_pos,
                        current_angle,
                        ""
                    )
                    break
                case "S":
                    previous_pos = draw_bond(
                        previous_pos,
                        current_angle,
                        "single"
                    )
                    break
                case "D":
                    previous_pos = draw_bond(
                        previous_pos,
                        current_angle,
                        "double"
                    )
                    break
                case "H":
                    previous_pos = draw_bond(
                        previous_pos,
                        current_angle,
                        "hydrogen"
                    )
                    break
                case "J":
                    previous_pos = draw_bond(
                        previous_pos,
                        current_angle,
                        "hydrogen_reversed"
                    )
                    break
                case "K":
                    previous_pos = draw_bond(
                        previous_pos,
                        current_angle,
                        "one_and_half"
                    )
                    break
                case "L":
                    previous_pos = draw_bond(
                        previous_pos,
                        current_angle,
                        "one_and_half_reversed"
                    )
                    break
                case "C":
                    previous_pos = draw_bond(
                        previous_pos,
                        current_angle,
                        "circle"
                    )
                    break
                case "+":
                    current_angle += angle
                    if (current_angle > Math.PI * 2)
                        current_angle %= Math.PI * 2
                    break
                case "-":
                    current_angle -= angle
                    if (current_angle < 0)
                        current_angle += Math.PI * 2
                    break
                case "R":
                    checkpoint = [previous_pos, current_angle]
                    break
                case "B":
                    previous_pos = checkpoint[0]
                    current_angle = checkpoint[1]
                    break
                case "T":
                    if (angle == Math.PI / 6 || angle == -1 * Math.PI / 6)
                        angle = (reversed ? -1 : 1) * Math.PI / 180 * 36
                    else
                        angle = (!reversed ? -1 : 1) * Math.PI / 6
                    current_angle = 0
                    break
                case "Y":
                    if (angle == Math.PI / 6 || angle == -1 * Math.PI / 6)
                        angle = (reversed ? -1 : 1) * Math.PI / 180 * 36
                    else
                        angle = (!reversed ? -1 : 1) * Math.PI / 6
                    break
            }
            i++
        }
    
        return ending_position
    }

    let current_position = [30, 240]
    setWidth(60 + ((formula.length - 1) * 3 * single_width) + amino_acids[formula[formula.length - 1]]["width"] * single_width)
    setHeight(520)
    // ctx.fillStyle = "red"
    // ctx.fillRect(0, 0, canvas.width, canvas.height)
    formula.forEach((el, index) => {
        if (index == 0) {
            current_position = draw_amino_acid(amino_acids[el]["structure"], current_position, "start")
        } else if (index == formula.length - 1) {
            current_position = draw_amino_acid(amino_acids[el]["structure"], current_position, "end", index % 2 == 1)
        } else {
            current_position = draw_amino_acid(amino_acids[el]["structure"], current_position, "middle", index % 2 == 1)
        }
    })
    clearZones.forEach((el) => {
        ctx.clearRect(el[0] - (el[2] / 2) - 1, el[1] - 7, el[2] + 2, 13)
        ctx.font = font
        ctx.textAlign = "center"
        ctx.fillStyle = "black"
        ctx.fillText(el[3], el[0], el[1] + (bond_length / 10))
    })
  }, [])
  
  return <canvas ref={canvasRef} {...props}/>
}

export default Protein