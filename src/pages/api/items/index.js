import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const { name, amps, category, volts } = req.body;

  if (!name || !category) {
    return res.json({
      error: 'All fields are required',
    });
  }

  const result = await prisma.appliance.create({
    data: {
      ...req.body,
      category: undefined,
      categoryId: category,
    },
  });
  res.json(result);
}
