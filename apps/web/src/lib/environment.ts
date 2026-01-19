/**
 *  Retourne true si le mode de fonctionnement est PROD
 * @returns boolean
 */
export const isProductionMode = (): boolean => {
    return process.env.MODE_FONCTIONNEMENT === 'PROD';
}