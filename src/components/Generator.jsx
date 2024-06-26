import React, { useState } from 'react'
import SectionWrapper from './SectionWrapper'
import { SCHEMES, WORKOUTS } from '../utils/swoldier'
import Button from './Button'

function Header(props) {
	const { index, title, description } = props
	return (
		<div className='flex flex-col gap-4'>
			<div className='flex items-center justify-center gap-2'>
				<p className='text-3xl sm:text-4xl md:text-5xl font-semibold text-stone-400'>{index}</p>
				<h4 className='text-lg sm:text-2xl md:text-3xl'>{title}</h4>
			</div>
			<p className='text-sm sm:text-base mx-auto'>{description}</p>
		</div>
	)
}

export default function Generator(props) {
	const { muscles, setMuscles, poison, setPoison, goal, setGoal, updateWorkout } = props
	const [showModal, setShowModal] = useState(false)


	function toggleModal() {
		setShowModal(!showModal)
	}

	function updateMuscles(muscleGroup) {
		// Type of individual and muscles are included
		// Set muscles to array that filters the selected muscle group
		if (muscles.includes(muscleGroup)) {
			setMuscles(muscles.filter(val => val !== muscleGroup))
			return
		}
		// Guard clause to prevent user from choosing too many muscle groups
		// Removal logic
		if (muscles.length > 2) {
			return
		}
		// Guard clause is used to prevent nested if/else statements --> neater code
		if (poison !== 'individual') {
			setMuscles([muscleGroup])
			setShowModal(false)
			return
		}
		// With 'Individual' selected, close modal after 3 muscle groups are selected
		setMuscles([...muscles, muscleGroup])
		if (muscles.length == 2) {
			setShowModal(false)
		}
	}

  	return (
		<SectionWrapper id={'generate'} header={"generate your workout"} title={['It\'s', 'Huge', 'o\'clock']}>
			<Header index={'01'} title={'Pick your poison'} description={"Select the workout you wish to endure."} />
			<div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
				{Object.keys(WORKOUTS).map((type, typeIndex) => {
					return (
						<button onClick={() => {
							setMuscles([])
							setPoison(type)
						}} className={'bg-stone-950 border duration-200 px-4 hover:border-yellow-600 py-3 rounded-lg ' + (type === poison ? 'border-yellow-600' : 'border-yellow-400')}  key={typeIndex}>
							<p className='capitalize'>{type.replaceAll('_', " ")}</p>
						</button>
					)
				})}
			</div>
			<Header index={'02'} title={'Lock on targets'} description={"Select the muscles judged for annihilation."} />
			<div className='bg-stone-950 border border-solid border-yellow-400 rounded-lg flex flex-col'>
				<button onClick={toggleModal} className='relative p-3 flex items-center justify-center'>
					<p className='capitalize'>{muscles.length == 0 ? 'Select muscle groups' : muscles.join(' ')}</p>
					<i className="fa-solid absolute right-3 top-1/2 -translate-y-1/2 fa-caret-down"></i>
				</button>
				{/* Short circuit operator: If showModal is true */}
				{showModal && (
					<div className='flex flex-col px-3 pb-3'>
						{(poison === 'individual' ? WORKOUTS[poison] : Object.keys(WORKOUTS[poison])).map((muscleGroup, muscleGroupIndex) => {
							return (
								<button onClick={() => {
									updateMuscles(muscleGroup)
								}} key={muscleGroupIndex} className={'hover:text-yellow-400 duration-200 ' + (muscles.includes(muscleGroup) ? 'text-yellow-400 ' : ' ')}>
									<p className='uppercase'>{muscleGroup.replaceAll('_', " ")}</p>
								</button>
							)
						})}
					</div>
				)}
			</div>
			<Header index={'03'} title={'Become a Demi-God'} description={"Select your ultimate objective."} />
			<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
				{Object.keys(SCHEMES).map((scheme, schemeIndex) => {
					return (
						<button onClick={() => {
							setGoal(scheme)
						}} className={'bg-stone-950 border duration-200 px-4 hover:border-yellow-600 py-3 rounded-lg ' + (scheme === goal ? 'border-yellow-600' : 'border-yellow-400')}  key={schemeIndex}>
							<p className='capitalize'>{scheme.replaceAll('_', " ")}</p>
						</button>
					)
				})}
			</div>
		<Button func={updateWorkout} text={"Formulate"}></Button>
		</SectionWrapper>
  	)
}
