import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";
import { loadSoundsPlugin } from "@tsparticles/plugin-sounds";
import "./fireworks.css";

function Firework() {
	const [init, setInit] = useState(false);
	const [showFireworks, setShowFireworks] = useState(false);
	const [toggled, setToggled] = useState(false);

	// load the fireworks preset once per app lifetime
	useEffect(() => {
		initParticlesEngine(async (engine) => {
			await loadFireworksPreset(engine);
			await loadSoundsPlugin(engine);
		}).then(() => {
			setInit(true);
		});
	}, []);

	const handleClick = () => {
		setToggled((prev) => {
			const newToggled = !prev;
			setShowFireworks(newToggled);
			return newToggled;
		});
	};

	const handleMouseEnter = () => {
		if (!toggled) {
			setShowFireworks(true);
		}
	};

	const handleMouseLeave = () => {
		if (!toggled) {
			setShowFireworks(false);
		}
	};

	// define your options, including the preset
	const options = useMemo(
		() => ({
			fullscreen: {
				enabled: true,
				zIndex: 10
			},
			preset: "fireworks",
		}),
		[]
	);

	if (!init) {
		return null; // or a spinner
	}

	return (
		<div className="fireworks-container">
			{showFireworks && (
				<Particles
					id="tsparticles"
					options={options}
				/>
			)}
			<button
				className={`fireworks-button${toggled ? ' toggled' : ''}`}
				onClick={handleClick}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				{toggled ? '🎆 Click to Stop! 🎆' : '🎆 Fireworks! 🎆'}
			</button>
		</div>
	);
}

export default Firework;