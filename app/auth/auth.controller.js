import { faker } from '@faker-js/faker'
import { hash } from 'argon2'
import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { generateToken } from './generate-token.js'
import { UserFields } from '../utils/user.utils.js'

// @desc authUser
// @route POSt/api/auth/login
// @access Public
export const authUser = asyncHandler(async (req, res) => {
	const user = await prisma.user.findMany()

	res.json(user)
})

// @desc registerUser
// @route POSt/api/auth/register
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const isHaveUser = await prisma.user.findUnique({
		where: {
			email
		}
	})

	if (isHaveUser) {
		res.status(400)
		throw new Error('User already exist')
	}

	const user = await prisma.user.create({
		data: {
			email,
			password: await hash(password),
			name: faker.name.fullName()
		},
		select: UserFields
	})

	const token = generateToken(user.id)

	res.json({ user, token })
})
