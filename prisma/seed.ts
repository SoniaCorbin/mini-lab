import prisma from "../lib/prisma";

async function main() {
  // Nettoyage des données existantes
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product.deleteMany();

  // Création des produits
  const product1 = await prisma.product.create({
    data: {
      name: "T-shirt basique",
      description: "Un t-shirt en coton confortable",
      price: 19.99,
    },
  });

  await prisma.product.create({
    data: {
      name: "Jean slim",
      description: "Jean slim coupe moderne",
      price: 49.99,
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: "Sneakers blanches",
      description: null,
      price: 89.99,
    },
  });

  // Création d'un panier de test
  const cart = await prisma.cart.create({
    data: {
      userId: "user-test-001",
    },
  });

  // Ajout d'articles dans le panier
  await prisma.cartItem.createMany({
    data: [
      { cartId: cart.id, productId: product1.id, quantity: 2 },
      { cartId: cart.id, productId: product3.id, quantity: 1 },
    ],
  });

  console.log("✅ Seed terminé !");
  console.log(`   - ${await prisma.product.count()} produits créés`);
  console.log(`   - ${await prisma.cart.count()} panier(s) créé(s)`);
  console.log(`   - ${await prisma.cartItem.count()} article(s) dans le(s) panier(s)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
