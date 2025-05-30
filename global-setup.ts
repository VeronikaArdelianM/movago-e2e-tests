import { type FullConfig } from '@playwright/test';
import { seedLessons, seedAdminUser, seedNewUser } from './utils/seedData';

async function globalSetup(config: FullConfig) {
    await seedLessons();
    await seedAdminUser();
    await seedNewUser();
}

export default globalSetup;