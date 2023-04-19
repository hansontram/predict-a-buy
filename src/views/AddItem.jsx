import { React, useState } from 'react';

import { addItem } from '../api/firebase';

export function AddItem({ listToken }) {
	const [itemName, setItemName] = useState('');
	const [daysUntilNextPurchase, setDaysUntilNextPurchase] = useState(7);
	const [isError, setIsError] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const submitForm = (e) => {
		e.preventDefault();
		try {
			addItem(listToken, { itemName, daysUntilNextPurchase });
			setIsError(false);
			setIsSubmitted(true);
		} catch {
			setIsError(true);
			setIsSubmitted(true);
		}
		setItemName('');
		setDaysUntilNextPurchase(7);
	};

	const handleNameInput = (e) =>
		setItemName(e.target.value.split(/ +/).join(' '));

	const handleFrequencyInput = (e) => setDaysUntilNextPurchase(+e.target.value);

	return (
		<form onSubmit={(e) => submitForm(e)}>
			<label htmlFor="itemName">Item name:</label>
			<input
				type="text"
				id="itemName"
				name="itemName"
				value={itemName}
				onChange={handleNameInput}
				required
			/>

			<fieldset>
				<legend htmlFor="itemFrequencyInDays">
					How soon will you buy this again?
				</legend>
				<input
					type="radio"
					id="7"
					name="itemFrequencyInDays"
					value="7"
					checked={daysUntilNextPurchase === 7}
					onChange={handleFrequencyInput}
				/>
				<label htmlFor="7">Soon</label>
				<input
					type="radio"
					id="14"
					name="itemFrequencyInDays"
					value="14"
					checked={daysUntilNextPurchase === 14}
					onChange={handleFrequencyInput}
				/>
				<label htmlFor="14">Kind of soon</label>
				<input
					type="radio"
					id="30"
					name="itemFrequencyInDays"
					value="30"
					checked={daysUntilNextPurchase === 30}
					onChange={handleFrequencyInput}
				/>
				<label htmlFor="30">Not Soon</label>
			</fieldset>

			<button type="submit">Add Item</button>
			{isSubmitted ? (
				isError ? (
					<p>"Item is NOT saved in the database"</p>
				) : (
					<p>"Item is saved in the database"</p>
				)
			) : null}
		</form>
	);
}
