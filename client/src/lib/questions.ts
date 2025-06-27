export interface Question {
  category: string;
  optionA: string;
  optionB: string;
  leftWeight: number;
  rightWeight: number;
}

export const questions: Question[] = [
  {
    category: "경제 / 복지",
    optionA: "국가는 복지를 확대해 사회적 안전망을 강화해야 한다",
    optionB: "복지는 최소한으로 하고, 개인의 책임과 자율에 맡겨야 한다",
    leftWeight: 1,
    rightWeight: -1
  },
  {
    category: "경제 / 복지",
    optionA: "최저임금은 생활 가능한 수준으로 올려야 한다",
    optionB: "최저임금은 시장 논리에 맡기는 것이 바람직하다",
    leftWeight: 1,
    rightWeight: -1
  },
  {
    category: "안보 / 외교",
    optionA: "북한과의 대화와 협력이 평화를 가져온다",
    optionB: "북한에 대한 강경한 자세가 더 효과적이다",
    leftWeight: 1,
    rightWeight: -1
  },
  {
    category: "안보 / 외교",
    optionA: "한미동맹보다 자주국방이 더 중요하다",
    optionB: "한미동맹은 안보의 핵심이므로 더욱 강화해야 한다",
    leftWeight: 1,
    rightWeight: -1
  },
  {
    category: "사회 / 젠더",
    optionA: "페미니즘은 여전히 한국 사회에 꼭 필요한 운동이다",
    optionB: "페미니즘은 이제 남성에 대한 역차별로 작용하고 있다",
    leftWeight: 1,
    rightWeight: -1
  },
  {
    category: "사회 / 젠더",
    optionA: "퀴어 퍼레이드는 다양성을 존중하는 표현이다",
    optionB: "불쾌감을 줄 수 있는 행사는 제한되어야 한다",
    leftWeight: 1,
    rightWeight: -1
  },
  {
    category: "교육 / 세대",
    optionA: "교육은 모두에게 평등한 기회를 제공해야 한다",
    optionB: "능력과 노력에 따라 차별화된 교육 기회를 제공해야 한다",
    leftWeight: 1,
    rightWeight: -1
  },
  {
    category: "교육 / 세대",
    optionA: "수시 제도는 다양한 능력을 반영하는 좋은 제도다",
    optionB: "정시 확대가 공정하고 투명한 방법이다",
    leftWeight: 1,
    rightWeight: -1
  },
  {
    category: "시장 / 대기업",
    optionA: "대기업에 대한 규제를 강화해 중소기업을 보호해야 한다",
    optionB: "대기업의 자유로운 활동이 경제 전반에 더 도움이 된다",
    leftWeight: 1,
    rightWeight: -1
  },
  {
    category: "시장 / 대기업",
    optionA: "부동산 시장은 정부가 적극 개입해 가격을 안정시켜야 한다",
    optionB: "부동산은 시장 원리에 따라 움직이게 해야 한다",
    leftWeight: 1,
    rightWeight: -1
  },
  {
    category: "환경 / 기후",
    optionA: "환경 보호를 위해 세금을 늘리는 것도 감수할 수 있다",
    optionB: "경제 성장을 위해 환경 규제는 최소화되어야 한다",
    leftWeight: 1,
    rightWeight: -1
  },
  {
    category: "환경 / 기후",
    optionA: "탈핵과 재생에너지 확대가 필요하다",
    optionB: "원전은 안정적인 에너지원이므로 유지 또는 확대해야 한다",
    leftWeight: 1,
    rightWeight: -1
  }
];
