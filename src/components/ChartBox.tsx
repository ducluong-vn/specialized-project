import react from "react"
import {
	ResponsiveContainer,
	LineChart,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Line,
} from "recharts"

export default function ChartBox(props: {
	data: Array<{ name: string; value: number }>
}) {
	return (
	<ResponsiveContainer width="100%" height={300}>
		<LineChart
			data={props.data}
			margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
		>
			<XAxis dataKey="name" />
			<YAxis />
			<CartesianGrid strokeDasharray="3 3" />
			<Tooltip />
			<Line type="monotone" dataKey="value" stroke="#8884d8" />
		</LineChart>
	</ResponsiveContainer>
	)
}
