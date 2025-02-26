interface HouseDetailsProps {
  title: string;
  price: string;
  description: string;
  setSelectedHouse: () => void;
}

export default function HouseDetailsModal({
  title,
  description,
  price,
  setSelectedHouse,
  position,
}: HouseDetailsProps & { position: { x: number; y: number } }) {
  return (
		<div
			className="fixed z-20 inset-0 bg-black bg-opacity-30 flex"
			onClick={setSelectedHouse}
		>
			<div
				className="z-30 bg-gray-50 p-6 rounded-lg shadow-lg max-w-md w-full transition-all"
				style={{
					position: "absolute",
					top: position.y + 20, // Ajuste fino da posição vertical
					left: position.x + 20, // Ajuste fino da posição horizontal
					transform: "translate(-50%, -50%)",
				}}
				onClick={(e) => e.stopPropagation()}
			>
				<h2 className="text-xl font-bold text-black">{title}</h2>
				<p className="text-gray-700 mt-1">{description}</p>
				<p className="text-lg text-gray-800 font-semibold mt-4">Preço: {price}</p>
				<button
					className="mt-4 bg-blue-900 text-white font-bold px-4 py-2 rounded"
					onClick={setSelectedHouse}
				>
					Fechar
				</button>
			</div>
		</div>
  );
}
