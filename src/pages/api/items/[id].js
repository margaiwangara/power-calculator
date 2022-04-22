import prisma from '../../../lib/prisma';

// UPDATE and DELETE /api/items/:id
export default async function handle(req, res) {
  const itemId = req.query.id;

  if (req.method === 'PUT') {
    const item = await prisma.appliance.update({
      where: {
        id: parseInt(itemId),
      },
      data: {
        ...req.body,
        categoryId: req.body.category,
        category: undefined,
      },
    });

    return res.json(item);
  } else if (req.method === 'DELETE') {
    const item = await prisma.appliance.delete({
      where: { id: parseInt(itemId) },
    });
    return res.json({
      success: true,
    });
  } else {
    return res.json({
      error: 'The HTTP ${req.method} method is not supported at this route.',
    });
  }
}
