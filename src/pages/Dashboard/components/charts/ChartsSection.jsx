import { TaskPerformance } from './TaskPerformance'
import { SalesOverview } from './SalesOverview'
import { TopProducts } from './TopProducts'
import { OrderStatus } from './OrderStatus'


export default function ChartsSection() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <TaskPerformance />
            <SalesOverview />
            <TopProducts />
            <OrderStatus />
        </div>
    )
}