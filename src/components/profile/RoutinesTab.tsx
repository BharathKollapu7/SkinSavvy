
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from '@/components/ui/card';
import { ShoppingBag, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface SkincareRoutine {
  id: string;
  routine_type: string;
  products: string[];
  created_at: string;
}

interface RoutineTemplate {
  id: string;
  concern_name: string;
  skincare_steps: string[];
  food_recommendations: string[];
  home_remedies: string[];
  icon: string;
}

interface ComboRoutine {
  id: string;
  concerns: string[];
  morning_suggestion: string;
  night_suggestion: string;
}

interface RoutinesTabProps {
  routines: SkincareRoutine[];
}

const concernLabels: Record<string, string> = {
  'tan': 'Tan',
  'acne': 'Acne',
  'sensitivity': 'Sensitivity',
  'dark_spots': 'Dark Spots',
  'redness': 'Redness',
  'dryness': 'Dryness',
  'aging': 'Aging',
  'pores': 'Pores',
  'hyperpigmentation': 'Hyperpigmentation',
  'blackheads_whiteheads': 'Blackheads & Whiteheads'
};

const RoutinesTab: React.FC<RoutinesTabProps> = ({ routines }) => {
  const { profile } = useAuth();
  const [routineTemplates, setRoutineTemplates] = useState<RoutineTemplate[]>([]);
  const [comboRoutines, setComboRoutines] = useState<ComboRoutine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoutineData = async () => {
      if (!profile?.skin_concerns || profile.skin_concerns.length === 0) {
        setLoading(false);
        return;
      }

      try {
        // Fetch routine templates for selected concerns
        const { data: templates } = await supabase
          .from('routine_templates')
          .select('*')
          .in('concern_name', profile.skin_concerns);

        // Transform the data to match our interface
        const transformedTemplates: RoutineTemplate[] = templates?.map(template => ({
          id: template.id,
          concern_name: template.concern_name,
          skincare_steps: Array.isArray(template.skincare_steps) 
            ? template.skincare_steps as string[]
            : [],
          food_recommendations: template.food_recommendations || [],
          home_remedies: template.home_remedies || [],
          icon: template.icon || ''
        })) || [];

        // Fetch combo routines if multiple concerns are selected
        let comboData: ComboRoutine[] = [];
        if (profile.skin_concerns.length >= 2) {
          const { data: combos } = await supabase
            .from('combo_routines')
            .select('*');
          
          // Filter combo routines that match user's concerns
          comboData = combos?.filter(combo => 
            combo.concerns.every(concern => profile.skin_concerns?.includes(concern))
          ) || [];
        }

        setRoutineTemplates(transformedTemplates);
        setComboRoutines(comboData);
      } catch (error) {
        console.error('Error fetching routine data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutineData();
  }, [profile?.skin_concerns]);

  if (loading) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-skin-darkgreen mx-auto mb-4"></div>
          <CardDescription>Loading your personalized routines...</CardDescription>
        </CardContent>
      </Card>
    );
  }

  if (!profile?.skin_concerns || profile.skin_concerns.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <CardTitle className="text-lg mb-2">No skin concerns selected</CardTitle>
          <CardDescription>
            Please select your primary skin concerns in Settings to see personalized routines.
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Multi-Concern Routine Suggestor */}
      {profile.skin_concerns.length >= 2 && (
        <Card className="border-2 border-skin-brown/20 bg-gradient-to-r from-skin-cream to-skin-beige/50">
          <CardHeader>
            <CardTitle className="text-skin-darkgreen font-playfair text-xl">
              🌟 Multi Concern Routine Suggester
            </CardTitle>
            <CardDescription className="text-skin-olive">
              Managing multiple skin concerns requires a strategic approach
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Best Practices Checklist */}
            <div className="bg-white/60 rounded-lg p-4 space-y-3">
              <h4 className="font-semibold text-skin-darkgreen mb-2">✅ Best Practices for Multiple Concerns:</h4>
              <div className="space-y-2 text-sm text-skin-olive">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Treat the Main Issue First:</strong> Focus on the concern bothering you most right now</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Avoid Mixing Harsh Actives:</strong> Don't use Retinol + Vitamin C or Retinol + Benzoyl Peroxide together</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Multi-Problem Ingredients:</strong> Niacinamide (acne, spots, pores), Hyaluronic Acid (dryness, aging), Ceramides (dryness, irritation)</span>
                </div>
              </div>
            </div>

            {/* Combo Routines Table */}
            {comboRoutines.length > 0 && (
              <div className="bg-white/60 rounded-lg p-4">
                <h4 className="font-semibold text-skin-darkgreen mb-3">Combo Routines for Your Concerns:</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold text-skin-darkgreen">Skin Concerns</TableHead>
                      <TableHead className="font-semibold text-skin-darkgreen">Morning Suggestion</TableHead>
                      <TableHead className="font-semibold text-skin-darkgreen">Night Suggestion</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comboRoutines.map((combo) => (
                      <TableRow key={combo.id}>
                        <TableCell className="font-medium">
                          {combo.concerns.map(concern => concernLabels[concern] || concern).join(' + ')}
                        </TableCell>
                        <TableCell className="text-sm">{combo.morning_suggestion}</TableCell>
                        <TableCell className="text-sm">{combo.night_suggestion}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Individual Concern Routines */}
      {routineTemplates.map((template) => (
        <Card key={template.id} className="shadow-lg border border-skin-beige/30 bg-white/95">
          <CardHeader className="pb-4">
            <CardTitle className="text-skin-darkgreen font-playfair text-xl flex items-center gap-2">
              <span className="text-2xl">{template.icon}</span>
              {concernLabels[template.concern_name] || template.concern_name} Routine
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Skincare Steps */}
            <div className="bg-skin-cream/30 rounded-lg p-4">
              <h4 className="font-semibold text-skin-darkgreen mb-3 flex items-center gap-2">
                🧴 Skincare Steps
              </h4>
              <ul className="space-y-3">
                {template.skincare_steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-skin-olive">
                    <span className="w-6 h-6 bg-skin-darkgreen text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5" style={{ fontVariantNumeric: 'tabular-nums' }}>
                      {index + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Food Recommendations */}
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-skin-darkgreen mb-2 flex items-center gap-2">
                  🥗 Food Recommendations
                </h4>
                <ul className="space-y-2">
                  {template.food_recommendations.map((food, index) => (
                    <li key={index} className="text-sm text-skin-olive flex items-start gap-3">
                      <span className="text-green-600 flex-shrink-0 mt-1">•</span>
                      <span className="leading-relaxed">{food}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Home Remedies */}
              <div className="bg-amber-50 rounded-lg p-4">
                <h4 className="font-semibold text-skin-darkgreen mb-2 flex items-center gap-2">
                  🏠 Home Remedies
                </h4>
                <ul className="space-y-2">
                  {template.home_remedies.map((remedy, index) => (
                    <li key={index} className="text-sm text-skin-olive flex items-start gap-3">
                      <span className="text-amber-600 flex-shrink-0 mt-1">•</span>
                      <span className="leading-relaxed">{remedy}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* User's Custom Routines */}
      {routines.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-skin-darkgreen font-playfair">Your Custom Routines</CardTitle>
            <CardDescription>Routines you've created and saved</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {routines.map((routine) => (
                <Card key={routine.id} className="border border-skin-beige/50">
                  <CardHeader>
                    <CardTitle className="capitalize text-skin-darkgreen">{routine.routine_type} Routine</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {routine.products.length === 0 ? (
                      <p className="text-gray-600">No products added to this routine yet.</p>
                    ) : (
                      <ul className="space-y-3">
                        {routine.products.map((product, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-skin-darkgreen text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5" style={{ fontVariantNumeric: 'tabular-nums' }}>
                              {index + 1}
                            </span>
                            <span className="text-sm leading-relaxed">{product}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RoutinesTab;
