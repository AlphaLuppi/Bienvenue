interface FormState {
    typeAction: string;
    typeBien: string;
    localisations: string[];
    metiers: string[];
    cardinalite: string[];
    loisirs: string[];
    localisationType: string;
}



export const formState = $state<FormState>({
    typeAction: "acheter",
    typeBien: "appartement", 
    localisations: [],
    metiers: [],
    cardinalite: [],
    loisirs: [],
    localisationType: "village"


});

export function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    formState[field] = value;
} 