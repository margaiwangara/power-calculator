import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const { name, icon } = req.body;

  if (!name) {
    return res.json({
      error: 'Category Name is required',
    });
  }

  const result = await prisma.category.create({
    data: {
      name,
      icon,
    },
  });
  res.json(result);
}
