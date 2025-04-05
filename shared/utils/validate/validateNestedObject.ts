/**
 * 중첩된 객체의 필드 값을 검증하는 유틸리티 함수
 * @param {Object} object - 검증할 객체
 * @param {Object} validationRules - 검증 규칙 객체
 * @param {Object} context - 검증에 필요한 추가 컨텍스트 데이터
 * @returns {Object} - 검증 결과 { isValid: boolean, errors: Object }
 *
 * @example
 * const object = {
 *   name: 'John',
 *   age: 25,
 *   email: 'john@example.com',
 *   phone: '010-1234-5678',
 *   address: {
 *     street: '123 Main St',
 *     city: 'Seoul',
 *     zipCode: '12345'
 *   },
 *   preferences: {
 *     notifications: true,
 *     theme: 'dark'
 *   },
 *   orders: [
 *     { id: 1, amount: 1000 },
 *     { id: 2, amount: 2000 }
 *   ],
 *   tags: ['new', 'vip'],
 *   lastLogin: '2024-04-04T12:00:00Z'
 * };
 *
 * const validationRules = {
 *   name: {
 *     required: true,
 *     type: 'string',
 *     minLength: 2,
 *     maxLength: 50,
 *     pattern: /^[a-zA-Z\s]+$/
 *   },
 *   age: {
 *     required: true,
 *     type: 'number',
 *     min: 0,
 *     max: 120
 *   },
 *   email: {
 *     required: true,
 *     type: 'string',
 *     pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
 *   },
 *   phone: {
 *     required: true,
 *     type: 'string',
 *     pattern: /^010-\d{4}-\d{4}$/
 *   },
 *   address: {
 *     street: { required: true, type: 'string' },
 *     city: { required: true, type: 'string' },
 *     zipCode: {
 *       required: true,
 *       type: 'string',
 *       pattern: /^\d{5}$/
 *     }
 *   },
 *   preferences: {
 *     notifications: { required: true, type: 'boolean' },
 *     theme: {
 *       required: true,
 *       type: 'string',
 *       enum: ['light', 'dark', 'system']
 *     }
 *   },
 *   orders: {
 *     type: 'array',
 *     minLength: 0,
 *     maxLength: 10,
 *     items: {
 *       id: { required: true, type: 'number' },
 *       amount: { required: true, type: 'number', min: 0 }
 *     }
 *   },
 *   tags: {
 *     type: 'array',
 *     minLength: 0,
 *     maxLength: 5,
 *     items: { type: 'string' }
 *   },
 *   lastLogin: {
 *     required: true,
 *     type: 'string',
 *     pattern: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/
 *   }
 * };
 *
 * // validate 함수 사용 예시
 * const customValidationRules = {
 *   age: {
 *     required: true,
 *     validate: (value, context) => {
 *       if (value < context.minAge) {
 *         return `나이는 ${context.minAge}세 이상이어야 합니다.`;
 *       }
 *       return true;
 *     }
 *   },
 *   city: {
 *     required: true,
 *     validate: (value, context) => {
 *       if (!context.validRegions.includes(value)) {
 *         return `유효하지 않은 지역입니다. (${context.validRegions.join(', ')})`;
 *       }
 *       return true;
 *     }
 *   },
 *   // parentObject를 사용한 validate 함수 예시
 *   orders: {
 *     type: 'array',
 *     items: {
 *       amount: {
 *         required: true,
 *         validate: (value, context, parentObject) => {
 *           // 주문 금액이 1000원 미만이면서 VIP 태그가 있는 경우 검증
 *           if (value < 1000 && parentObject.tags?.includes('vip')) {
 *             return 'VIP 고객의 주문 금액은 1000원 이상이어야 합니다.';
 *           }
 *           return true;
 *         }
 *       }
 *     }
 *   },
 *   // 중첩된 객체에서 parentObject를 사용한 예시
 *   address: {
 *     street: {
 *       required: true,
 *       validate: (value, context, parentObject) => {
 *         // 도시가 서울인 경우 주소 형식 검증
 *         if (parentObject.city === '서울' && !value.includes('구')) {
 *           return '서울 주소는 구 단위까지 입력해야 합니다.';
 *         }
 *         return true;
 *       }
 *     }
 *   }
 * };
 *
 * // validate와 type을 함께 사용하면 안 되는 예시
 * const invalidRules = {
 *   age: {
 *     type: 'number',  // type과 validate를 함께 사용하면 안 됨
 *     validate: (value) => value > 0
 *   }
 * };
 *
 * const context = {
 *   minAge: 18,
 *   validRegions: ['서울', '부산'],
 *   regionDetails: {
 *     '서울': ['강남', '강북'],
 *     '부산': ['해운대', '서면']
 *   }
 * };
 *
 * const result = validateNestedObject(object, validationRules, context);
 *
 * @see =================== 변경 내역 ==================
 * [작성자][작업일시] - 내용
 * [H00040][2025-04-04 Friday 18:15:41] - 최초작성
 */

interface ValidationRule {
  required?: boolean;
  type?: "string" | "number" | "boolean" | "array" | "object" | "date" | "email" | "url";
  pattern?: RegExp;
  patternMessage?: string;
  enum?: any[];
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  validate?: (value: any, context: any, parentObject?: any) => boolean | string;
  items?: ValidationRule;
  properties?: Record<string, ValidationRule>;
  [key: string]: any; // 인덱스 시그니처 추가
}

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, any>;
}

interface ArrayValidationResult extends ValidationResult {
  items?: Array<{
    index: number;
    isValid: boolean;
    errors: Record<string, any>;
  }>;
}

interface FieldValidationResult extends ValidationResult {
  required?: string;
  custom?: string;
  type?: string;
  pattern?: string;
  enum?: string;
  min?: string;
  max?: string;
}

export function validateNestedObject(
  object: Record<string, any>,
  validationRules: Record<string, ValidationRule>,
  context: Record<string, any> = {}
): ValidationResult {
  function checkType(value: any, type: ValidationRule["type"]): { isValid: boolean; error: string } {
    switch (type) {
      case "string":
        return { isValid: typeof value === "string", error: "문자열이어야 합니다." };
      case "number":
        return { isValid: typeof value === "number", error: "숫자여야 합니다." };
      case "boolean":
        return { isValid: typeof value === "boolean", error: "불리언이어야 합니다." };
      case "array":
        return { isValid: Array.isArray(value), error: "배열이어야 합니다." };
      case "object":
        return {
          isValid: typeof value === "object" && value !== null && !Array.isArray(value),
          error: "객체여야 합니다.",
        };
      case "date":
        return { isValid: value instanceof Date || !isNaN(Date.parse(value)), error: "유효한 날짜여야 합니다." };
      case "email":
        return { isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), error: "유효한 이메일 주소여야 합니다." };
      case "url":
        try {
          new URL(value);
          return { isValid: true, error: "" };
        } catch {
          return { isValid: false, error: "유효한 URL이어야 합니다." };
        }
      default:
        return { isValid: true, error: "" };
    }
  }

  /**
   * 필드 값을 검증하는 함수
   * @param {*} value - 검증할 필드 값
   * @param {Object} rules - 검증 규칙 객체
   * @param {string} path - 현재 검증 중인 필드의 경로 (예: 'address.city')
   * @param {Object} context - 검증에 필요한 외부 데이터
   * @param {Object} parentObject - 현재 검증 중인 필드가 속한 부모 객체
   * @returns {Object} - 검증 결과 { isValid: boolean, errors: Object }
   */
  function validateField(
    value: any,
    rules: ValidationRule,
    path: string = "",
    context: Record<string, any> = {},
    parentObject: Record<string, any> = {}
  ): FieldValidationResult {
    let isValid = true;
    const fieldErrors: FieldValidationResult["errors"] = {};

    // required 체크
    if (rules.required && (value === undefined || value === null || value === "")) {
      fieldErrors.required = "필수 입력값입니다.";
      isValid = false;
      return { isValid, errors: fieldErrors };
    }

    // validate 함수 체크 (value가 undefined가 아닌 경우에만)
    if (rules.validate && value !== undefined) {
      const validationResult = rules.validate(value, context, parentObject);
      if (validationResult !== true) {
        fieldErrors.custom = validationResult as string;
        isValid = false;
      }
    }

    // type 체크
    if (rules.type) {
      const typeCheck = checkType(value, rules.type);
      if (!typeCheck.isValid) {
        fieldErrors.type = typeCheck.error;
        isValid = false;
      }
    }

    // pattern 체크
    if (rules.pattern && !rules.pattern.test(value)) {
      fieldErrors.pattern = rules.patternMessage || "올바른 형식이 아닙니다.";
      isValid = false;
    }

    // enum 체크
    if (rules.enum && !rules.enum.includes(value)) {
      fieldErrors.enum = `유효하지 않은 값입니다. (${rules.enum.join(", ")})`;
      isValid = false;
    }

    // min/max 체크
    if (rules.min !== undefined && value < rules.min) {
      fieldErrors.min = `최소값은 ${rules.min}입니다.`;
      isValid = false;
    }
    if (rules.max !== undefined && value > rules.max) {
      fieldErrors.max = `최대값은 ${rules.max}입니다.`;
      isValid = false;
    }

    return { isValid, errors: fieldErrors };
  }

  /**
   * 배열을 검증하는 함수
   * @param {Array} array - 검증할 배열
   * @param {Object} rules - 검증 규칙 객체
   * @param {string} path - 현재 검증 중인 배열의 경로
   * @param {Object} context - 검증에 필요한 외부 데이터
   * @returns {Object} - 검증 결과 { isValid: boolean, errors: Object, items: Array<Object> }
   */
  function validateArray(
    array: any[],
    rules: ValidationRule,
    path: string = "",
    context: Record<string, any> = {}
  ): ArrayValidationResult {
    let isValid = true;
    const arrayErrors: Record<string, any> = {};
    const items: Array<{
      index: number;
      isValid: boolean;
      errors: Record<string, any>;
    }> = [];

    // 배열 길이 체크
    if (rules.minLength !== undefined && array.length < rules.minLength) {
      arrayErrors.minLength = `최소 ${rules.minLength}개의 항목이 필요합니다.`;
      isValid = false;
    }
    if (rules.maxLength !== undefined && array.length > rules.maxLength) {
      arrayErrors.maxLength = `최대 ${rules.maxLength}개의 항목이 허용됩니다.`;
      isValid = false;
    }

    // 배열 아이템 검증
    array.forEach((item, index) => {
      const itemPath = `${path}[${index}]`;
      const itemResult = validateObject(item, rules.items || {}, itemPath, context);

      items.push({
        index,
        isValid: itemResult.isValid,
        errors: itemResult.errors,
      });

      if (!itemResult.isValid) {
        isValid = false;
      }
    });

    return {
      isValid,
      errors: arrayErrors,
      items,
    };
  }

  /**
   * 객체의 모든 필드를 검증하는 함수
   * @param {Object} obj - 검증할 객체
   * @param {Object} rules - 검증 규칙 객체
   * @param {string} path - 현재 검증 중인 객체의 경로
   * @param {Object} context - 검증에 필요한 외부 데이터
   * @returns {Object} - 검증 결과 { isValid: boolean, errors: Object }
   */
  function validateObject(
    obj: Record<string, any>,
    rules: ValidationRule | Record<string, ValidationRule>,
    path: string = "",
    context: Record<string, any> = {}
  ): ValidationResult {
    let isValid = true;
    const objectErrors: Record<string, any> = {};

    // properties 속성이 있는 경우 해당 속성 내부의 필드들을 검증
    if ("properties" in rules) {
      const propertiesResult = validateObject(obj, rules.properties || {}, path, context);
      return propertiesResult;
    }

    for (const [key, rule] of Object.entries(rules as Record<string, ValidationRule>)) {
      const currentPath = path ? `${path}.${key}` : key;
      const value = obj[key];

      // 중첩된 객체인 경우
      if (rule && typeof rule === "object" && !rule.required && !rule.type && !rule.pattern) {
        const result = validateObject(value || {}, rule, currentPath, context);
        if (!result.isValid) {
          objectErrors[key] = result.errors;
          isValid = false;
        }
        continue;
      }

      // 배열인 경우
      if (rule.type === "array") {
        const result = validateArray(value || [], rule, currentPath, context);
        if (!result.isValid) {
          objectErrors[key] = result;
          isValid = false;
        }
        continue;
      }

      // 일반 필드 검증
      const result = validateField(value, rule, currentPath, context, obj);
      if (!result.isValid) {
        objectErrors[key] = result.errors;
        isValid = false;
      }
    }

    return { isValid, errors: objectErrors };
  }

  const result = validateObject(object, validationRules, "", context);

  return {
    isValid: result.isValid,
    errors: result.errors,
  };
}

export default validateNestedObject;
