import Link from 'next/link';
import { getUserOrders } from '@/actions/orders';
import { formatPrice, formatDateTime } from '@/lib/format';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const statusColors = {
  PENDING: 'bg-yellow-500',
  PROCESSING: 'bg-blue-500',
  SHIPPED: 'bg-purple-500',
  DELIVERED: 'bg-green-500',
  CANCELLED: 'bg-red-500',
};

const statusLabels = {
  PENDING: 'Pendiente',
  PROCESSING: 'En Proceso',
  SHIPPED: 'Enviado',
  DELIVERED: 'Entregado',
  CANCELLED: 'Cancelado',
};

export const metadata = {
  title: 'Mis Pedidos',
  description: 'Historial de pedidos',
};

export default async function OrdersPage() {
  const orders = await getUserOrders();

  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold mb-2">No tienes pedidos aún</h2>
        <p className="text-foreground/60 mb-6">Realiza tu primera compra</p>
        <Button asChild>
          <Link href="/products">Ver Productos</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Mis Pedidos</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Pedido #{order.id.slice(0, 8)}</CardTitle>
                <Badge className={statusColors[order.status]}>
                  {statusLabels[order.status]}
                </Badge>
              </div>
              <p className="text-sm text-foreground/60">{formatDateTime(order.createdAt)}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-foreground/70">
                      {item.product.name} x {item.quantity}
                    </span>
                    <span className="font-medium">
                      {formatPrice(Number(item.price) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-foreground/10">
                <span className="font-bold">Total: {formatPrice(Number(order.total))}</span>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/orders/${order.id}`}>Ver Detalles</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
