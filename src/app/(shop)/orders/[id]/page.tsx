import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getOrderById } from '@/actions/orders';
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

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Detalle del Pedido</h1>
        <Button asChild variant="outline">
          <Link href="/orders">Volver a Mis Pedidos</Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Información del Pedido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-foreground/60">ID:</span>{' '}
              <span className="font-mono">{order.id}</span>
            </div>
            <div>
              <span className="text-foreground/60">Fecha:</span>{' '}
              <span>{formatDateTime(order.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-foreground/60">Estado:</span>
              <Badge className={statusColors[order.status]}>
                {statusLabels[order.status]}
              </Badge>
            </div>
            <div>
              <span className="text-foreground/60">Total:</span>{' '}
              <span className="font-bold text-lg">{formatPrice(Number(order.total))}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Información de Envío</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <p className="font-semibold">{order.shippingName}</p>
            <p className="text-foreground/70">{order.shippingEmail}</p>
            <p className="text-foreground/70">{order.shippingAddress}</p>
            <p className="text-foreground/70">
              {order.shippingCity}, {order.shippingPostal}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Productos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between pb-4 border-b border-foreground/10 last:border-0"
              >
                <div className="flex-1">
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="font-semibold hover:underline"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-sm text-foreground/60">
                    Cantidad: {item.quantity} x {formatPrice(Number(item.price))}
                  </p>
                </div>
                <span className="font-bold">{formatPrice(Number(item.price) * item.quantity)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
