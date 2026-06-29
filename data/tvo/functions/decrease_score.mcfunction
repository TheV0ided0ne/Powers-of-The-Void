scoreboard players add #timer Decay.Meter 1
execute if score #timer Decay.Meter matches 20.. run scoreboard players remove @a Decay.Meter 1
scoreboard players set @a[scores={Decay.Meter=..0}] Decay.Meter 0
execute if score #timer Decay.Meter matches 20.. run scoreboard players set #timer Decay.Meter 0
execute as @a[scores={Decay.Meter=100..}] run kill @s
execute as @a[scores={Decay.Meter=100..}] run scoreboard players set @a Decay.Meter 0
execute as @a[scores={Void.Essence=101..}] run scoreboard players set @a Void.Essence 100
execute as @a[scores={Void.Essence=..-1}] run scoreboard players set @a Void.Essence 0