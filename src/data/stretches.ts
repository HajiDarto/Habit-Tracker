import { StretchExercise } from '../types';

export const STRETCH_EXERCISES: StretchExercise[] = [
  {
    id: 'neck-roll',
    name: 'Neck Release & Gentle Tilt',
    category: 'Neck & Shoulders',
    targetMuscle: 'Upper Trapezius & Sternocleidomastoid',
    durationSeconds: 30,
    instructions: [
      'Sit or stand up tall with shoulders relaxed down.',
      'Gently lower your right ear toward your right shoulder without lifting your shoulder.',
      'Hold for 15 seconds feeling a gentle stretch on the left side of your neck.',
      'Smoothly switch to the left side and hold for 15 seconds.'
    ],
    tips: 'Breathe deeply and never force or jerk your neck.',
    svgType: 'neck'
  },
  {
    id: 'shoulder-blade-squeeze',
    name: 'Shoulder Rolls & Blade Squeeze',
    category: 'Neck & Shoulders',
    targetMuscle: 'Rhomboids & Mid-Back',
    durationSeconds: 30,
    instructions: [
      'Inhale as you roll both shoulders upward toward your ears.',
      'Roll them backward, pinching your shoulder blades together.',
      'Exhale and glide shoulders down into a relaxed posture.',
      'Repeat 5 forward rolls and 5 backward rolls with controlled rhythm.'
    ],
    tips: 'Opens up the chest collapsed from laptop hunching.',
    svgType: 'shoulder'
  },
  {
    id: 'wrist-forearm-flex',
    name: 'Wrist & Finger Extensor Flex',
    category: 'Wrists & Hands',
    targetMuscle: 'Forearm Flexors & Carpal Tunnel',
    durationSeconds: 30,
    instructions: [
      'Extend right arm straight in front, palm facing away with fingers pointing up.',
      'Use left hand to gently pull fingers back toward your body for 15 seconds.',
      'Flip hand so fingers point down and pull gently.',
      'Switch hands and repeat for the left arm.'
    ],
    tips: 'Essential relief for prolonged typing and mouse navigation.',
    svgType: 'wrist'
  },
  {
    id: 'seated-spinal-twist',
    name: 'Seated Torso Spinal Twist',
    category: 'Back & Spine',
    targetMuscle: 'Erector Spinae & Obliques',
    durationSeconds: 30,
    instructions: [
      'Sit sideways or tall on your chair with feet flat on the ground.',
      'Place right hand on the outside of your left knee or chair backrest.',
      'Inhale to lengthen your spine, exhale and gently rotate your torso to the left.',
      'Hold for 15 seconds, return to center, and twist to the right for 15 seconds.'
    ],
    tips: 'Mobilizes the thoracic spine and relieves lower back compression.',
    svgType: 'spine'
  },
  {
    id: 'standing-chest-opener',
    name: 'Standing Chest & Pectoral Opener',
    category: 'Back & Spine',
    targetMuscle: 'Pectoralis Major & Anterior Deltoids',
    durationSeconds: 30,
    instructions: [
      'Stand up tall away from your desk.',
      'Clasp your hands together behind your lower back.',
      'Gently straighten your arms and lift your hands slightly upward.',
      'Lift your chest, gaze softly forward, and take 3 slow, deep belly breaths.'
    ],
    tips: 'Reverses rounded desk posture and enhances oxygen intake.',
    svgType: 'chest'
  },
  {
    id: 'standing-quad-hip',
    name: 'Standing Quad & Hip Flexor Stretch',
    category: 'Legs & Hips',
    targetMuscle: 'Quadriceps & Psoas Major',
    durationSeconds: 30,
    instructions: [
      'Stand next to your desk or wall for balance support.',
      'Bend your right knee and hold your right ankle behind you with your right hand.',
      'Keep your knees close together and tuck your pelvis slightly forward.',
      'Hold for 15 seconds on the right leg, then switch to the left leg.'
    ],
    tips: 'Counteracts hip flexor tightness caused by sitting for hours.',
    svgType: 'quad'
  }
];
