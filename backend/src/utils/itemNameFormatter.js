import {
    PREFIX_TYPES,
    SUFFIX_TYPES,
} from "../constants/medicineTypes.js";

const capitalize = (value) =>
    value.charAt(0) + value.slice(1).toLowerCase();

export const formatMedicineName = (
    itemName,
    type
) => {
    const cleanName = itemName
        .trim()
        .replace(/\s+/g, " ");

    if (PREFIX_TYPES.includes(type)) {
        return `${capitalize(type)} ${cleanName}`;
    }

    if (SUFFIX_TYPES.includes(type)) {
        return `${cleanName} ${capitalize(type)}`;
    }

    return cleanName;
};