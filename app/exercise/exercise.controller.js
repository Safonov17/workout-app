import asyncHandler from 'express-async-handler'

import { prisma } from '../prisma.js'

// @desc Create user exercise
// @route POST /api/exercise
// @access Private
export const createNewExercise = asyncHandler(async (req, res) => {
	const { name, times, iconPath } = req.body

	const exercise = await prisma.exercise.create({
		data: {
			name,
			times,
			iconPath
		}
	})

	res.json(exercise)
})

// @desc Getting all the exercises
// @route GET /api/exercises
// @access Private
export const getExercises = asyncHandler(async (req, res) => {
	const exercises = await prisma.exercise.findMany()

	res.json(exercises)
})
