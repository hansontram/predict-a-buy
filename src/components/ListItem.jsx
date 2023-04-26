import { useEffect, useState } from 'react';
import { updateItem, undoUpdateItem } from '../api/firebase';

import './ListItem.css';

export function ListItem({ name, listToken, itemId, dateLastPurchased }) {
	const [wasPurchased, setWasPurchased] = useState(false);

	const handleCheck = () => {
		if (wasPurchased) {
			undoUpdateItem(listToken, itemId);
			setWasPurchased(false);
		} else {
			updateItem(listToken, itemId);
			setWasPurchased(true);
		}
	};

	useEffect(() => {
		const currentDate = new Date().getTime();
		const dayInMilliSec = 60 * 60 * 24 * 1000;

		const dateLastPurchasedPlus24h = dateLastPurchased
			? dateLastPurchased.toDate().getTime() + dayInMilliSec
			: null;

		if (currentDate < dateLastPurchasedPlus24h) {
			setWasPurchased(true);
		} else {
			setWasPurchased(false);
		}
	}, [dateLastPurchased]);

	return (
		<li className="ListItem">
			<label
				htmlFor="wasPurchased"
				aria-label="Did you purchase the item?"
			></label>
			<input
				type="checkbox"
				name="wasPurchased"
				id="wasPurchased"
				value={name}
				title="Did you purchase the item?"
				checked={wasPurchased}
				onChange={handleCheck}
			/>
			{name}
		</li>
	);
}
