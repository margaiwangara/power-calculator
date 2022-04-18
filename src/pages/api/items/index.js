import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const { name, amps, category, watts } = req.body;

  if (!name || !amps || !category || !watts) {
    return res.json({
      error: 'All fields are required',
    });
  }

  const result = await prisma.appliance.create({
    data: {
      ...req.body,
    },
  });
  res.json(result);
}
