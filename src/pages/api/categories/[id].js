import prisma from '../../../lib/prisma';

// UPDATE and DELETE /api/items/:id
export default async function handle(req, res) {
  const categoryId = req.query.id;

  if (req.method === 'PUT') {
    const category = await prisma.category.update({
      where: {
        id: parseInt(categoryId),
      },
      data: {
        ...req.body,
      },
    });

    return res.json(category);
  } else if (req.method === 'DELETE') {
    const category = await prisma.category.delete({
      where: { id: parseInt(categoryId) },
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
