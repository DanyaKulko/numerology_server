type MatrixItemConfig = {
    positionSlug: string; // Slug позиции в БД (Prisma)
    matrixKey: string;    // Ключ в объекте с числами (a, b, o7, prog_year...)
};

type MatrixSectionConfig = {
    categorySlug: string; // Slug категории в БД (Prisma)
    items: MatrixItemConfig[];
};

// ==========================================
// 1. GENERAL (ОСНОВНАЯ МАТРИЦА)
// ==========================================
export const STRUCTURE_GENERAL: MatrixSectionConfig[] = [
    {
        categorySlug: 'gen_qualities',
        items: [
            { positionSlug: 'gen_talent_a', matrixKey: 'a' },
            { positionSlug: 'gen_talent_b', matrixKey: 'b' },
            { positionSlug: 'gen_talent_c', matrixKey: 'c' }
        ]
    },
    {
        categorySlug: 'gen_soul_work',
        items: [
            { positionSlug: 'gen_work_a', matrixKey: 'a' },
            { positionSlug: 'gen_work_b', matrixKey: 'b' },
            { positionSlug: 'gen_work_c', matrixKey: 'c' }
        ]
    },
    {
        categorySlug: 'gen_karma_40',
        items: [
            { positionSlug: 'gen_task_40_d',    matrixKey: 'd' },
            { positionSlug: 'gen_task_pre_40',  matrixKey: 'd1' },
            { positionSlug: 'gen_task_post_40', matrixKey: 'd2' }
        ]
    },
    {
        categorySlug: 'gen_comfort',
        items: [
            { positionSlug: 'gen_comfort_e', matrixKey: 'e' }
        ]
    },
    {
        categorySlug: 'gen_self',
        items: [
            { positionSlug: 'gen_self_a2', matrixKey: 'a2' }
        ]
    },
    {
        categorySlug: 'gen_past_life',
        items: [
            { positionSlug: 'gen_past_d',  matrixKey: 'd' },
            { positionSlug: 'gen_past_d1', matrixKey: 'd1' },
            { positionSlug: 'gen_past_d2', matrixKey: 'd2' }
        ]
    },
    {
        categorySlug: 'gen_power',
        items: [
            { positionSlug: 'gen_power_e', matrixKey: 'e' }
        ]
    },
    {
        categorySlug: 'gen_ancestral',
        items: [
            { positionSlug: 'gen_ancestral_e1', matrixKey: 'e1' }
        ]
    },
    {
        categorySlug: 'gen_parent_karma',
        items: [
            { positionSlug: 'gen_par_teach_a',  matrixKey: 'a' },
            { positionSlug: 'gen_par_err_a2',   matrixKey: 'a2' },
            { positionSlug: 'gen_par_grow_a1',  matrixKey: 'a1' }
        ]
    },
    {
        categorySlug: 'gen_spirit_karma',
        items: [
            { positionSlug: 'gen_spirit_b',  matrixKey: 'b' },
            { positionSlug: 'gen_spirit_b1', matrixKey: 'b1' },
            { positionSlug: 'gen_spirit_b2', matrixKey: 'b2' }
        ]
    },
    {
        categorySlug: 'gen_relations',
        items: [
            { positionSlug: 'gen_rel_task_d2', matrixKey: 'd2' },
            { positionSlug: 'gen_rel_suit_k',  matrixKey: 'k' },
            { positionSlug: 'gen_rel_meet_k',  matrixKey: 'k' },
            { positionSlug: 'gen_rel_prob_j',  matrixKey: 'j' }
        ]
    },
    {
        categorySlug: 'gen_money',
        items: [
            { positionSlug: 'gen_money_prof_c2',  matrixKey: 'c2' },
            { positionSlug: 'gen_money_src_l',    matrixKey: 'l' },
            { positionSlug: 'gen_money_task_l',   matrixKey: 'l' },
            { positionSlug: 'gen_money_task_c2',  matrixKey: 'c2' },
            { positionSlug: 'gen_money_block_j',  matrixKey: 'j' },
            { positionSlug: 'gen_money_unlock_j', matrixKey: 'j' }
        ]
    },
    {
        categorySlug: 'gen_purpose',
        items: [
            { positionSlug: 'gen_purp_pers_r', matrixKey: 'r' },
            { positionSlug: 'gen_purp_pers_s', matrixKey: 's' },
            { positionSlug: 'gen_purp_pers_y', matrixKey: 'y' },
            { positionSlug: 'gen_purp_soc_t',  matrixKey: 't' },
            { positionSlug: 'gen_purp_soc_u',  matrixKey: 'u' },
            { positionSlug: 'gen_purp_soc_v',  matrixKey: 'v' },
            { positionSlug: 'gen_purp_spirit_w', matrixKey: 'w' }
        ]
    },
    {
        categorySlug: 'gen_ancestral_tasks',
        items: [
            { positionSlug: 'gen_anc_fat_m_f', matrixKey: 'f' },
            { positionSlug: 'gen_anc_mot_m_h', matrixKey: 'h' },
            { positionSlug: 'gen_anc_fat_f_g', matrixKey: 'g' },
            { positionSlug: 'gen_anc_mot_f_i', matrixKey: 'i' }
        ]
    },
    {
        categorySlug: 'gen_health_gen',
        items: [
            { positionSlug: 'gen_health_pat_h',  matrixKey: 'h' },
            { positionSlug: 'gen_health_mat_i',  matrixKey: 'i' },
            { positionSlug: 'gen_health_pred_a', matrixKey: 'a' },
            { positionSlug: 'gen_health_pred_b', matrixKey: 'b' },
            { positionSlug: 'gen_health_pred_c', matrixKey: 'c' }
        ]
    },
    {
        categorySlug: 'health_map',
        items: [
            // Итоги
            { positionSlug: 'health_total_o', matrixKey: 'o' },
            { positionSlug: 'health_total_p', matrixKey: 'p' },
            { positionSlug: 'health_total_q', matrixKey: 'q' },
            // Чакры (7 -> 1)
            { positionSlug: 'health_sahasrara_o7', matrixKey: 'o7' },
            { positionSlug: 'health_sahasrara_p7', matrixKey: 'p7' },
            { positionSlug: 'health_sahasrara_q7', matrixKey: 'q7' },

            { positionSlug: 'health_adjna_o6', matrixKey: 'o6' },
            { positionSlug: 'health_adjna_p6', matrixKey: 'p6' },
            { positionSlug: 'health_adjna_q6', matrixKey: 'q6' },

            { positionSlug: 'health_vishudkha_o5', matrixKey: 'o5' },
            { positionSlug: 'health_vishudkha_p5', matrixKey: 'p5' },
            { positionSlug: 'health_vishudkha_q5', matrixKey: 'q5' },

            { positionSlug: 'health_anakhata_o4', matrixKey: 'o4' },
            { positionSlug: 'health_anakhata_p4', matrixKey: 'p4' },
            { positionSlug: 'health_anakhata_q4', matrixKey: 'q4' },

            { positionSlug: 'health_manipura_o3', matrixKey: 'o3' },
            { positionSlug: 'health_manipura_p3', matrixKey: 'p3' },
            { positionSlug: 'health_manipura_q3', matrixKey: 'q3' },

            { positionSlug: 'health_svadkhistana_o2', matrixKey: 'o2' },
            { positionSlug: 'health_svadkhistana_p2', matrixKey: 'p2' },
            { positionSlug: 'health_svadkhistana_q2', matrixKey: 'q2' },

            { positionSlug: 'health_muladkhara_o1', matrixKey: 'o1' },
            { positionSlug: 'health_muladkhara_p1', matrixKey: 'p1' },
            { positionSlug: 'health_muladkhara_q1', matrixKey: 'q1' },
        ]
    }
];

// ==========================================
// 2. FINANCE (ФИНАНСЫ)
// ==========================================
export const STRUCTURE_FINANCE: MatrixSectionConfig[] = [
    {
        categorySlug: 'finance_talents',
        items: [
            { positionSlug: 'finance_talent_a', matrixKey: 'a' },
            { positionSlug: 'finance_talent_b', matrixKey: 'b' },
            { positionSlug: 'finance_talent_c', matrixKey: 'c' }
        ]
    },
    {
        categorySlug: 'finance_self',
        items: [
            { positionSlug: 'finance_opp_a2', matrixKey: 'a2' }
        ]
    },
    {
        categorySlug: 'finance_tasks',
        items: [
            { positionSlug: 'finance_task_pers_t', matrixKey: 't' },
            { positionSlug: 'finance_task_pers_u', matrixKey: 'u' },
            { positionSlug: 'finance_task_pers_v', matrixKey: 'v' }
        ]
    },
    {
        categorySlug: 'finance_karma',
        items: [
            { positionSlug: 'finance_karma_c',  matrixKey: 'c' },  // Django model: TheMainTask40Years (mapped to 'c' in help_text)
            { positionSlug: 'finance_karma_c1', matrixKey: 'c1' },
            { positionSlug: 'finance_karma_c2', matrixKey: 'c2' }
        ]
    },
    {
        categorySlug: 'finance_flow',
        items: [
            { positionSlug: 'finance_source_j', matrixKey: 'j' },
            { positionSlug: 'finance_open_l',   matrixKey: 'l' },
            { positionSlug: 'finance_area_c2',  matrixKey: 'c2' }
        ]
    },
    {
        categorySlug: 'finance_blocks',
        items: [
            { positionSlug: 'finance_block_j', matrixKey: 'j' },
            { positionSlug: 'finance_task_l',  matrixKey: 'l' },
            { positionSlug: 'finance_task_c2', matrixKey: 'c2' }
        ]
    }
];

// ==========================================
// 3. COMPATIBILITY (СОВМЕСТИМОСТЬ)
// ! Важно: matrixKey здесь должны приходить из расчета МАТРИЦЫ ПАРЫ (сложение двух людей)
// ==========================================
export const STRUCTURE_COMPATIBILITY: MatrixSectionConfig[] = [
    {
        categorySlug: 'compat_meet',
        items: [
            { positionSlug: 'compat_meet_a', matrixKey: 'a' }
        ]
    },
    {
        categorySlug: 'compat_tasks',
        items: [
            { positionSlug: 'compat_task_w', matrixKey: 'w' },
            { positionSlug: 'compat_task_d', matrixKey: 'd' },
            { positionSlug: 'compat_task_y', matrixKey: 'y' }
        ]
    },
    {
        categorySlug: 'compat_resources',
        items: [
            { positionSlug: 'compat_res_b',  matrixKey: 'b' },
            { positionSlug: 'compat_res_c',  matrixKey: 'c' },
            { positionSlug: 'compat_fill_e', matrixKey: 'e' }
        ]
    },
    {
        categorySlug: 'compat_social',
        items: [
            { positionSlug: 'compat_soc_v', matrixKey: 'v' }
        ]
    },
    {
        categorySlug: 'compat_money',
        items: [
            { positionSlug: 'compat_money_c2',      matrixKey: 'c2' },
            { positionSlug: 'compat_money_task_l',  matrixKey: 'l' },
            { positionSlug: 'compat_money_block_j', matrixKey: 'j' }
        ]
    },
    {
        categorySlug: 'compat_relations',
        items: [
            { positionSlug: 'compat_rel_d2',     matrixKey: 'd2' },
            { positionSlug: 'compat_rel_k',      matrixKey: 'k' },
            { positionSlug: 'compat_rel_prob_j', matrixKey: 'j' }
        ]
    }
];

// ==========================================
// 4. CHILD (ДЕТСКАЯ)
// ==========================================
export const STRUCTURE_CHILD: MatrixSectionConfig[] = [
    {
        categorySlug: 'child_talents',
        items: [
            { positionSlug: 'child_card_a',   matrixKey: 'a' },
            { positionSlug: 'child_talent_b', matrixKey: 'b' },
            { positionSlug: 'child_talent_c', matrixKey: 'c' }
        ]
    },
    {
        categorySlug: 'child_self',
        items: [
            { positionSlug: 'child_opp_a2',    matrixKey: 'a2' },
            { positionSlug: 'child_comfort_e', matrixKey: 'e' }
        ]
    },
    {
        categorySlug: 'child_karma',
        items: [
            { positionSlug: 'child_karma_d',  matrixKey: 'd' },
            { positionSlug: 'child_karma_d2', matrixKey: 'd2' },
            { positionSlug: 'child_karma_d1', matrixKey: 'd1' }
        ]
    },
    {
        categorySlug: 'child_purpose',
        items: [
            { positionSlug: 'child_purp_r', matrixKey: 'r' },
            { positionSlug: 'child_purp_s', matrixKey: 's' },
            { positionSlug: 'child_purp_y', matrixKey: 'y' }
        ]
    },
    {
        categorySlug: 'child_family',
        items: [
            { positionSlug: 'child_fam_teach_a',   matrixKey: 'a' },
            { positionSlug: 'child_fam_err_a2',    matrixKey: 'a2' },
            { positionSlug: 'child_fam_growth_a1', matrixKey: 'a1' }
        ]
    }
];

// ==========================================
// 5. PROGNOSIS (ПРОГНОЗЫ)
// ! Важно: В `calculateMatrix` нужно добавить логику расчета `prog_year` и месяцев
// ==========================================
export const STRUCTURE_PROGNOSIS: MatrixSectionConfig[] = [
    {
        categorySlug: 'prog_general',
        items: [
            // Аркан года (нужно рассчитать и положить в ключ prog_year)
            { positionSlug: 'prog_general_val', matrixKey: 'prog_year' }
        ]
    },
    {
        categorySlug: 'prog_month',
        items: [
            // Арканы месяцев (нужно рассчитать и положить в ключи)
            { positionSlug: 'prog_month_01', matrixKey: 'prog_month_1' },
            { positionSlug: 'prog_month_02', matrixKey: 'prog_month_2' },
            { positionSlug: 'prog_month_03', matrixKey: 'prog_month_3' },
            { positionSlug: 'prog_month_04', matrixKey: 'prog_month_4' },
            { positionSlug: 'prog_month_05', matrixKey: 'prog_month_5' },
            { positionSlug: 'prog_month_06', matrixKey: 'prog_month_6' },
            { positionSlug: 'prog_month_07', matrixKey: 'prog_month_7' },
            { positionSlug: 'prog_month_08', matrixKey: 'prog_month_8' },
            { positionSlug: 'prog_month_09', matrixKey: 'prog_month_9' },
            { positionSlug: 'prog_month_10', matrixKey: 'prog_month_10' },
            { positionSlug: 'prog_month_11', matrixKey: 'prog_month_11' },
            { positionSlug: 'prog_month_12', matrixKey: 'prog_month_12' }
        ]
    }
];
