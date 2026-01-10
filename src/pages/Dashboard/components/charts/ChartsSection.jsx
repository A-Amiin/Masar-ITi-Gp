import { TaskPerformance } from './TaskPerformance'
import { RepresentativePerformance } from './RepresentativePerformance'
import { TopProducts } from './TopProducts'
import { OrderStatus } from './OrderStatus'


export default function ChartsSection() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <TaskPerformance />
            <RepresentativePerformance />
            <TopProducts />
            <OrderStatus />
        </div>
    )
}