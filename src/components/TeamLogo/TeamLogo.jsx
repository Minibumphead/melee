import React, { useState, useRef } from "react";
import styles from './TeamLogo.module.css'


export default function TeamLogo({ children }) {
	const inputRef = useRef()
	const [makeSelection, setMakeSelection] = useState(true);
	const [logo, setLogo] = useState()

	const handleFileSelector = (e) => {
		const [file] = e.target.files
		setLogo(URL.createObjectURL(file))
		setMakeSelection(false)
	}


	const handleReselect = () => {
		inputRef.current.click()
	}

	return (
		<div className={styles.root}>
			{
				<div>
					<input className={makeSelection ? styles.display_selector : styles.hide_selector} ref={inputRef} type="file" id="file" name="file" onChange={handleFileSelector} />
				</div>

			}

			<img className={logo ? styles.logo : styles.hide} src={logo} alt="" onClick={() => handleReselect()} />
		</div>)
}