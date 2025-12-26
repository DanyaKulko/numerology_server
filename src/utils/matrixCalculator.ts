import {MatrixCategoryType} from "./dataFetcher";

function reduceTo22(num: number) {
    let n = Math.abs(Number(num));

    if (isNaN(n)) return 0;

    while (n > 22) {
        let sum = 0;
        const digits = String(n);
        for (let i = 0; i < digits.length; i++) {
            sum += parseInt(digits[i], 10);
        }
        n = sum;
    }

    return n === 0 ? 22 : n;
}

function calculateBaseMatrix({ day, month, year }: { day: string | number; month: string | number; year: string | number; }) {
    const d_val = Number(day);
    const m_val = Number(month);
    const y_val = Number(year);

    const a = reduceTo22(d_val);      // День рождения
    const b = reduceTo22(m_val);      // Месяц рождения
    const c = reduceTo22(y_val);      // Год рождения
    const d = reduceTo22(a + b + c);  // Нижняя точка
    const e = reduceTo22(a + b + c + d); // Точка душевного комфорта (Центр)

    // --- Прямой квадрат (Родовой) ---
    const f = reduceTo22(a + b);      // Верхний левый угол
    const g = reduceTo22(b + c);      // Верхний правый угол
    const h = reduceTo22(c + d);      // Нижний правый угол
    const i = reduceTo22(d + a);      // Нижний левый угол

    // --- Сила Рода / Доп. точки ---
    const e2 = reduceTo22(f + g + h + i);
    const e1 = reduceTo22(e + e2);

    // --- Линии Земли и Неба (Чакры и промежуточные) ---
    // Линия Земли (Вертикаль + Горизонталь внутри)
    const a2 = reduceTo22(a + e);
    const a1 = reduceTo22(a + a2);
    const n  = reduceTo22(a2 + e); // Вишудха (приблизительно)

    const b2 = reduceTo22(b + e);
    const b1 = reduceTo22(b + b2);
    const m  = reduceTo22(b2 + e); // Тоже уровень горла/сердца

    const c2 = reduceTo22(c + e);  // Вход в деньги/материю
    const c1 = reduceTo22(c + c2);

    const d2 = reduceTo22(d + e);  // Вход в кармический хвост/отношения
    const d1 = reduceTo22(d + d2);

    // --- Родовые каналы (детализация) ---
    const f2 = reduceTo22(f + e); const f1 = reduceTo22(f + f2);
    const g2 = reduceTo22(g + e); const g1 = reduceTo22(g + g2);
    const h2 = reduceTo22(h + e); const h1 = reduceTo22(h + h2);
    const i2 = reduceTo22(i + e); const i1 = reduceTo22(i + i2);

    // --- Денежно-Любовный канал (Нижняя горизонталь) ---
    // J - Стык отношений и денег
    const j = reduceTo22(d2 + c2);
    // K - Канал отношений (вход)
    const k = reduceTo22(d2 + j);
    // L - Канал денег (вход)
    const l = reduceTo22(c2 + j);

    // --- Предназначения ---
    // Личное (До 40 лет)
    const r = reduceTo22(b + d); // Небо (b + d)
    const s = reduceTo22(a + c); // Земля (a + c)
    const y = reduceTo22(r + s); // Итог (Личное)

    // Социальное (Для людей)
    const t = reduceTo22(f + h); // Мужской род
    const u = reduceTo22(g + i); // Женский род
    const v = reduceTo22(t + u); // Итог (Социальное)

    // Духовное (Общее)
    const w = reduceTo22(y + v); // Личное + Социальное

    // Планетарное (Высшее) - иногда используется
    const x = reduceTo22(w + v);

    // --- Карта Здоровья (Чакры) ---
    // Физика (Земная линия - диагональ A-C и её производные)
    const o7 = reduceTo22(a);
    const o6 = reduceTo22(a1);
    const o5 = reduceTo22(a2);
    const o4 = reduceTo22(n);
    const o3 = reduceTo22(e);
    const o2 = reduceTo22(c2);
    const o1 = reduceTo22(c);
    const o  = reduceTo22(a + a1 + a2 + n + e + c2 + c); // Итог Физики

    // Энергия (Небесная линия - диагональ B-D и её производные)
    const p7 = reduceTo22(b);
    const p6 = reduceTo22(b1);
    const p5 = reduceTo22(b2);
    const p4 = reduceTo22(m);
    const p3 = reduceTo22(e);
    const p2 = reduceTo22(d2);
    const p1 = reduceTo22(d);
    const p  = reduceTo22(b + b1 + b2 + m + e + d2 + d); // Итог Энергии

    // Эмоции (Сумма Физики и Энергии)
    const q7 = reduceTo22(o7 + p7);
    const q6 = reduceTo22(o6 + p6);
    const q5 = reduceTo22(o5 + p5);
    const q4 = reduceTo22(o4 + p4);
    const q3 = reduceTo22(o3 + p3);
    const q2 = reduceTo22(o2 + p2);
    const q1 = reduceTo22(o1 + p1);
    const q  = reduceTo22(o + p); // Общий итог здоровья

    // --- Прогностика по годам (Круг лет) ---
    // Это точки на круге матрицы, соответствующие возрасту
    const a5 = reduceTo22(a + f);
    const a2_3 = reduceTo22(a + a5);
    const a3_4 = reduceTo22(a2_3 + a5);
    const a1_2 = reduceTo22(a + a2_3);
    const a7_8 = reduceTo22(f + a5);
    const a8_9 = reduceTo22(a7_8 + f);
    const a6_7 = reduceTo22(a5 + a7_8);

    const f15 = reduceTo22(f + b);
    const f12_13 = reduceTo22(f + f15);
    const f13_14 = reduceTo22(f12_13 + f15);
    const f11_12 = reduceTo22(f + f12_13);
    const f17_18 = reduceTo22(b + f15);
    const f18_19 = reduceTo22(b + f17_18);
    const f16_17 = reduceTo22(f15 + f17_18);

    const b25 = reduceTo22(b + g);
    const b22_23 = reduceTo22(b + b25);
    const b23_24 = reduceTo22(b22_23 + b25);
    const b21_22 = reduceTo22(b + b22_23);
    const b27_28 = reduceTo22(g + b25);
    const b28_29 = reduceTo22(g + b27_28);
    const b26_27 = reduceTo22(b25 + b27_28);

    const g35 = reduceTo22(g + c);
    const g32_33 = reduceTo22(g + g35);
    const g33_34 = reduceTo22(g32_33 + g35);
    const g31_32 = reduceTo22(g + g32_33);
    const g37_38 = reduceTo22(c + g35);
    const g38_39 = reduceTo22(c + g37_38);
    const g36_37 = reduceTo22(g35 + g37_38);

    const c45 = reduceTo22(c + h);
    const c42_43 = reduceTo22(c + c45);
    const c43_44 = reduceTo22(c42_43 + c45);
    const c41_42 = reduceTo22(c + c42_43);
    const c47_48 = reduceTo22(h + c45);
    const c48_49 = reduceTo22(h + c47_48);
    const c46_47 = reduceTo22(c45 + c47_48);

    const h55 = reduceTo22(h + d);
    const h52_53 = reduceTo22(h + h55);
    const h53_54 = reduceTo22(h52_53 + h55);
    const h51_52 = reduceTo22(h + h52_53);
    const h57_58 = reduceTo22(d + h55);
    const h58_59 = reduceTo22(d + h57_58);
    const h56_57 = reduceTo22(h55 + h57_58);

    const d65 = reduceTo22(d + i);
    const d62_63 = reduceTo22(d + d65);
    const d63_64 = reduceTo22(d62_63 + d65);
    const d61_62 = reduceTo22(d + d62_63);
    const d67_68 = reduceTo22(i + d65);
    const d68_69 = reduceTo22(i + d67_68);
    const d66_67 = reduceTo22(d65 + d67_68);

    const i75 = reduceTo22(i + a);
    const i72_73 = reduceTo22(i + i75);
    const i73_74 = reduceTo22(i72_73 + i75);
    const i71_72 = reduceTo22(i + i72_73);
    const i77_78 = reduceTo22(a + i75);
    const i78_79 = reduceTo22(a + i77_78);
    const i76_77 = reduceTo22(i75 + i77_78);

    return {
        day: String(d_val).padStart(2, '0'),
        month: String(m_val).padStart(2, '0'),
        year: String(y_val),

        a, b, c, d, e, e1, e2,
        f, g, h, i,
        a1, a2, n,
        b1, b2, m,
        c1, c2,
        d1, d2,
        f1, f2,
        g1, g2,
        h1, h2,
        i1, i2,
        j, k, l,
        r, s, y, t, u, v, w, x,
        o, o1, o2, o3, o4, o5, o6, o7,
        p, p1, p2, p3, p4, p5, p6, p7,
        q, q1, q2, q3, q4, q5, q6, q7,

        a1_2, a2_3, a3_4, a5, a6_7, a7_8, a8_9,
        f11_12, f12_13, f13_14, f15, f16_17, f17_18, f18_19,
        b21_22, b22_23, b23_24, b25, b26_27, b27_28, b28_29,
        g31_32, g32_33, g33_34, g35, g36_37, g37_38, g38_39,
        c41_42, c42_43, c43_44, c45, c46_47, c47_48, c48_49,
        h51_52, h52_53, h53_54, h55, h56_57, h57_58, h58_59,
        d61_62, d62_63, d63_64, d65, d66_67, d67_68, d68_69,
        i71_72, i72_73, i73_74, i75, i76_77, i77_78, i78_79
    };
}

function calculatePrognosis({ day, month, targetYear }: { day: string | number; month: string | number; targetYear: string | number; }) {
    const d = Number(day);
    const m = Number(month);
    const y = Number(targetYear);

    const yearEnergy = reduceTo22(d + m + reduceTo22(y));

    const months: Record<string, number> = {};
    for (let i = 1; i <= 12; i++) {
        months[`prog_month_${i}`] = reduceTo22(yearEnergy + i);
    }

    return {
        prog_year: yearEnergy,
        ...months
    };
}

function calculateCompatibility(m1: Record<string, number | string>, m2: Record<string, number | string>) {
    const result: Record<string, number | string> = {};

    for (const key in m1) {
        if (typeof m1[key] === 'number' && typeof m2[key] === 'number') {
            result[key] = reduceTo22(m1[key] + m2[key]);
        }
    }

    result.p1_date = `${m1.day}.${m1.month}.${m1.year}`;
    result.p2_date = `${m2.day}.${m2.month}.${m2.year}`;

    return result;
}

export function calculateMatrix({ day, month, year, type = 'GENERAL', partnerDate = null, forecastYear = null }: {
    day: string | number;
    month: string | number;
    year: string | number;
    type?: MatrixCategoryType;
    partnerDate?: { day: string | number; month: string | number; year: string | number; } | null;
    forecastYear?: string | number | null;
}) {
    const baseMatrix = calculateBaseMatrix({ day, month, year });

    if (type === 'COMPATIBILITY' && partnerDate) {
        const partnerMatrix = calculateBaseMatrix(partnerDate);
        return {
            firstMatrix: baseMatrix,
            secondMatrix: partnerMatrix,
            compatibilityMatrix: calculateCompatibility(baseMatrix, partnerMatrix)
        };
    }

    if (type === 'PROGNOSIS' || forecastYear) {
        const targetYear = forecastYear || new Date().getFullYear();
        const prognosis = calculatePrognosis({ day, month, targetYear });

        return { ...baseMatrix, ...prognosis };
    }

    return baseMatrix;
}
